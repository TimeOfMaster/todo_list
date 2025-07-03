
import React, {useState, useEffect} from 'react';
import {Box, Text, useInput, useApp} from 'ink';
import TextInput from 'ink-text-input';
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
    const [inputValue, setInputValue] = useState('');
    const [mode, setMode] = useState<'view' | 'adding' | 'editing'>('view');
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
            if (mode !== 'view') {
                setMode('view');
                setInputValue('');
            } else {
                exit();
            }
        }

        if (mode !== 'view') {
            return; // Don't process other keys while in adding/editing mode
        }

        if (key.upArrow) {
            setCursor(c => Math.max(0, c - 1));
        }

        if (key.downArrow) {
            setCursor(c => Math.min(todos.length - 1, c + 1));
        }

        if (input === 'n') {
            setMode('adding');
            setInputValue('');
        }

        if (input === 'e' && todos.length > 0) {
            setMode('editing');
            setInputValue(todos[cursor].text);
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

    const handleTextInputSubmit = (value: string) => {
        if (value.trim() === '') {
            setMode('view');
            return;
        }

        if (mode === 'editing' && todos.length > 0) {
            setTodos(t =>
                t.map((todo, i) =>
                    i === cursor ? {...todo, text: value.trim()} : todo
                )
            );
        } else if (mode === 'adding') {
            const newTodo: Todo = {
                id: Date.now(),
                text: value.trim(),
                completed: false,
            };
            setTodos(t => [...t, newTodo]);
        }
        setInputValue('');
        setMode('view');
    };

    return (
        <Box flexDirection="column">
            <Text>ToDo List</Text>
            {mode !== 'view' ? (
                <TextInput
                    value={inputValue}
                    onChange={setInputValue}
                    onSubmit={handleTextInputSubmit}
                    placeholder={mode === 'adding' ? "Enter new task..." : "Edit task..."}
                    focus={true}
                />
            ) : (
                <>
                    {todos.map((todo, i) => (
                        <Box key={todo.id}>
                            <Text color={i === cursor ? 'green' : 'white'}>
                                {i === cursor ? '> ' : '  '}
                                {todo.completed ? '[x]' : '[ ]'} {todo.text}
                            </Text>
                        </Box>
                    ))}
                </>
            )}
            <Box marginTop={1}>
                <Text>
                    Controls: (n)ew, (e)dit, (d)elete, (enter) toggle, (up/down) navigate, (esc) exit
                </Text>
            </Box>
        </Box>
    );
};

export default App;
