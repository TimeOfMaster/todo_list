"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ink_1 = require("ink");
const fs_1 = __importDefault(require("fs"));
const TODO_FILE = 'todos.json';
const App = () => {
    const [todos, setTodos] = (0, react_1.useState)([]);
    const [cursor, setCursor] = (0, react_1.useState)(0);
    const { exit } = (0, ink_1.useApp)();
    (0, react_1.useEffect)(() => {
        if (fs_1.default.existsSync(TODO_FILE)) {
            const data = fs_1.default.readFileSync(TODO_FILE, 'utf8');
            setTodos(JSON.parse(data));
        }
    }, []);
    (0, react_1.useEffect)(() => {
        fs_1.default.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
    }, [todos]);
    (0, ink_1.useInput)((input, key) => {
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
            const newTodo = {
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
            setTodos(t => t.map((todo, i) => i === cursor ? Object.assign(Object.assign({}, todo), { completed: !todo.completed }) : todo));
        }
    });
    return ((0, jsx_runtime_1.jsxs)(ink_1.Box, { flexDirection: "column", children: [(0, jsx_runtime_1.jsx)(ink_1.Text, { children: "ToDo List" }), todos.map((todo, i) => ((0, jsx_runtime_1.jsx)(ink_1.Box, { children: (0, jsx_runtime_1.jsxs)(ink_1.Text, { color: i === cursor ? 'green' : 'white', children: [i === cursor ? '> ' : '  ', todo.completed ? '[x]' : '[ ]', " ", todo.text] }) }, todo.id))), (0, jsx_runtime_1.jsx)(ink_1.Box, { marginTop: 1, children: (0, jsx_runtime_1.jsx)(ink_1.Text, { children: "Controls: (n)ew, (d)elete, (enter) toggle, (up/down) navigate, (esc) exit" }) })] }));
};
exports.default = App;
