# Usage

Once installed, you can launch the ToDo List Manager directly from your terminal:

```bash
npm start
```

The application will open in your terminal, displaying your current ToDo list.

### Interactive Controls

The ToDo List Manager is designed to be fully interactive. Use the following keys to manage your tasks:

-   `n` (New Task): Press `n` to enter a new task. A prompt will appear at the bottom of the screen. Type your task and press `Enter` to add it to the list.

    ```
    Enter new task... _
    ```

-   `e` (Edit Task): Select a task using the `Up` or `Down` arrow keys, then press `e` to edit its text. The selected task's text will appear in the input prompt. Modify the text and press `Enter` to save changes.

    ```
    Edit task... [Your Task Text]_
    ```

-   `d` (Delete Task): Select the task you wish to delete using the `Up` or `Down` arrow keys, then press `d`. The selected task will be immediately removed from the list.

-   `s` (Sort Tasks): Press `s` to cycle through the available sorting modes. The current sort mode is displayed in the top-right corner of the screen. The available modes are:
    -   Text (A-Z)
    -   Text (Z-A)
    -   Due Date (Oldest First)
    -   Due Date (Newest First)

-   `c` (Toggle Completed): Press `c` to toggle the visibility of completed tasks. An indicator in the top-right corner will show whether completed tasks are currently being displayed.

-   `Enter` (Toggle Completion): With a task selected, press `Enter` to toggle its completion status. A `[ ]` indicates an incomplete task, while `[x]` indicates a completed task.

-   `Up/Down Arrow` (Navigate): Use the arrow keys to move the selection cursor up and down your list of tasks.

-   `Esc` (Exit): Press the `Esc` key at any time to exit the application. If you are in the middle of adding or editing a task, pressing `Esc` will cancel the current operation and return to the main view.

### Due Dates

You can add an optional due date to any task by appending `@YYYY-MM-DD` to the end of the task description. For example:

```
My important task @2025-12-31
```

When a due date is present, it will be displayed next to the task. The due date can also be used for sorting.
