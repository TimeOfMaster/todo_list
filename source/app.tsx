
import React, {useState, useEffect} from 'react';
import {Box, Text, useInput, useApp} from 'ink';
import fs from 'fs';

const TODO_FILE = 'todos.json';

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [cursor, setCursor] = useState(0);
    const {exit} = useApp();

    useEffect(() => {
        if (fs.existsSync(TODO_FILE)) {
            const data = fs.readFileSync(TODO_FILE, 'utf8');
            setTodos(JSON.parse(data));
            console.log('Loaded todos:', JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
    }, [todos]);

    useInput((input, key) => {
        if (key.escape) {
            exit();
        }

        if (key.upArrow) {
            setCursor(c => Math.max(0, c - 1));
        }

        if (key.downArrow) {
            setCursor(c => Math.min(todos.length - 1, c + 1));
        }

        if (input === 'n') {
            const newTodo: Todo = {
                id: Date.now(),
                text: `Task ${todos.length + 1}`,
                completed: false,
            };
            setTodos(t => [...t, newTodo]);
        }

        if (input === 'd') {
            setTodos(t => t.filter((_, i) => i !== cursor));
            setCursor(c => Math.max(0, c - 1));
        }

        if (key.return) {
            setTodos(t =>
                t.map((todo, i) =>
                    i === cursor ? {...todo, completed: !todo.completed} : todo
                )
            );
        }
    });

    return (
        <Box flexDirection="column">
            <Text>ToDo List</Text>
            {todos.map((todo, i) => (
                <Box key={todo.id}>
                    <Text color={i === cursor ? 'green' : 'white'}>
                        {i === cursor ? '> ' : '  '}
                        {todo.completed ? '[x]' : '[ ]'} {todo.text}
                    </Text>
                </Box>
            ))}
            <Box marginTop={1}>
                <Text>
                    Controls: (n)ew, (d)elete, (enter) toggle, (up/down) navigate, (esc) exit
                </Text>
            </Box>
        </Box>
    );
};

export default App;
