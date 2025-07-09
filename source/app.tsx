
import React, {useState, useEffect} from 'react';
import {Box, Text, useInput, useApp, useStdout} from 'ink';
import TextInput from 'ink-text-input';
import fs from 'fs';
import Border from './border.js';

const TODO_FILE = 'todos.json';

type Todo = {
    id: number;
    text: string;
    completed: boolean;
    dueDate?: string;
};

type SortMode = 'text-asc' | 'text-desc' | 'dueDate-asc' | 'dueDate-desc';

const SORT_MODES: SortMode[] = ['text-asc', 'text-desc', 'dueDate-asc', 'dueDate-desc'];

const SORT_MODE_LABELS: Record<SortMode, string> = {
    'text-asc': 'Text (A-Z)',
    'text-desc': 'Text (Z-A)',
    'dueDate-asc': 'Due Date (Oldest First)',
    'dueDate-desc': 'Due Date (Newest First)',
};

const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [cursor, setCursor] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [mode, setMode] = useState<'view' | 'adding' | 'editing'>('view');
    const [sortMode, setSortMode] = useState<SortMode>('text-asc');
    const [showCompleted, setShowCompleted] = useState(true);
    const {exit} = useApp();
    const {stdout} = useStdout();

    useEffect(() => {
        if (fs.existsSync(TODO_FILE)) {
            const data = fs.readFileSync(TODO_FILE, 'utf8');
            setTodos(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        const originalTodos = [...todos];
        fs.writeFileSync(TODO_FILE, JSON.stringify(originalTodos, null, 2));
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
            setCursor(c => Math.min(filteredTodos.length - 1, c + 1));
        }

        if (input === 'n') {
            setMode('adding');
            setInputValue('');
        }

        if (input === 'e' && todos.length > 0) {
            setMode('editing');
            const currentTodo = filteredTodos[cursor];
            const currentText = currentTodo.dueDate
                ? `${currentTodo.text} @${currentTodo.dueDate}`
                : currentTodo.text;
            setInputValue(currentText);
        }

        if (input === 'd' && todos.length > 0) {
            const todoToDelete = filteredTodos[cursor];
            setTodos(t => t.filter(todo => todo.id !== todoToDelete.id));
            setCursor(c => Math.max(0, c - 1));
        }

        if (key.return && todos.length > 0) {
            const todoToToggle = filteredTodos[cursor];
            setTodos(t =>
                t.map(todo =>
                    todo.id === todoToToggle.id ? {...todo, completed: !todo.completed} : todo
                )
            );
        }

        if (input === 's') {
            setSortMode(current => {
                const nextIndex = (SORT_MODES.indexOf(current) + 1) % SORT_MODES.length;
                return SORT_MODES[nextIndex];
            });
        }

        if (input === 'c') {
            setShowCompleted(current => !current);
        }
    });

    const handleTextInputSubmit = (value: string) => {
        if (value.trim() === '') {
            setMode('view');
            return;
        }

        let text = value.trim();
        let dueDate: string | undefined = undefined;

        const extractionRegex = /\s@(\d{4}-\d{2}-\d{2})$/;
        const extractionMatch = value.match(extractionRegex);

        if (extractionMatch) {
            const potentialDueDate = extractionMatch[1];
            const validationRegex = /^20(((([248][048])|([13579][26]))-(((0[13578]|1[02])-([0-2][0-9]|3[01]))|((0[469]|11)-([0-2][0-9]|30))|(02-([0-2][0-9]))))|((([248][1-35-79])|([13579][013-57-9]))-(((0[13578]|1[02])-([0-2][0-9]|3[01]))|((0[469]|11)-([0-2][0-9]|30))|(02-(((0|1)[0-9])|(2[0-8]))))))$/;

            if (validationRegex.test(potentialDueDate)) {
                text = value.replace(extractionRegex, '').trim();
                dueDate = potentialDueDate;
            }
        }


        if (mode === 'editing' && todos.length > 0) {
            const todoToEdit = filteredTodos[cursor];
            setTodos(t =>
                t.map(todo =>
                    todo.id === todoToEdit.id
                        ? {...todo, text: text, dueDate}
                        : todo
                )
            );
        } else if (mode === 'adding') {
            const maxId = todos.reduce((max, todo) => (todo.id > max ? todo.id : max), 0);
            const newTodo: Todo = {
                id: maxId + 1,
                text: text,
                completed: false,
                dueDate,
            };
            setTodos(t => [...t, newTodo]);
        }
        setInputValue('');
        setMode('view');
    };

    const sortedTodos = [...todos].sort((a, b) => {
        switch (sortMode) {
            case 'text-asc':
                return a.text.localeCompare(b.text);
            case 'text-desc':
                return b.text.localeCompare(a.text);
            case 'dueDate-asc':
                if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
                if (a.dueDate) return -1;
                if (b.dueDate) return 1;
                return a.text.localeCompare(b.text); // Fallback sort for items without dates
            case 'dueDate-desc':
                if (a.dueDate && b.dueDate) return b.dueDate.localeCompare(a.dueDate);
                if (a.dueDate) return -1;
                if (b.dueDate) return 1;
                return a.text.localeCompare(b.text); // Fallback sort for items without dates
            default:
                return 0;
        }
    });

    const filteredTodos = showCompleted ? sortedTodos : sortedTodos.filter(todo => !todo.completed);

    const width = stdout.columns - 4;
    const line = '─'.repeat(width > 0 ? width : 0);

    return (
        <Border>
            <Box flexDirection="row" justifyContent="space-between" width={width}>
                <Text color="#cba6f7" bold>ToDo List</Text>
                <Box>
                    <Text color="gray">Sort: {SORT_MODE_LABELS[sortMode]} | </Text>
                    <Text color="gray">Show Completed: {showCompleted ? 'On' : 'Off'}</Text>
                </Box>
            </Box>
            <Text>{line}</Text>
            <Text> </Text>
            {mode !== 'view' ? (
                <TextInput
                    value={inputValue}
                    onChange={setInputValue}
                    onSubmit={handleTextInputSubmit}
                    placeholder={mode === 'adding' ? "Enter new task... (@YYYY-MM-DD)" : "Edit task..."}
                    focus={true}
                />
            ) : (
                <>
                    {filteredTodos.map((todo, i) => (
                        <Box key={todo.id}>
                            <Text color={i === cursor ? 'green' : 'white'}>
                                {i === cursor ? '> ' : '  '}
                                {todo.completed ? '[x]' : '[ ]'} {todo.text}
                                {todo.dueDate && <Text color="gray"> ({todo.dueDate})</Text>}
                            </Text>
                        </Box>
                    ))}
                </>
            )}
            <Box marginTop={1}>
                <Text>
                    Controls: (n)ew, (e)dit, (d)elete, (s)ort, (c)ompleted, (enter) toggle, (up/down) navigate, (esc) exit
                </Text>
            </Box>
        </Border>
    );
};


export default App;
