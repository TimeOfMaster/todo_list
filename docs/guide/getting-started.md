# Getting Started with ToDo List Manager

This guide will walk you through the process of setting up and effectively using the ToDo List Manager.

## Installation

To get started, you'll need Node.js and npm (Node Package Manager) installed on your system.

1.  **Clone the repository:**

    Begin by cloning the project repository to your local machine:

    ```bash
    git clone <repository-url>
    cd todo_list
    ```

2.  **Install dependencies:**

    Navigate into the cloned directory and install the required project dependencies:

    ```bash
    npm install
    ```

## Usage

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

-   `Enter` (Toggle Completion): With a task selected, press `Enter` to toggle its completion status. A `[ ]` indicates an incomplete task, while `[x]` indicates a completed task.

-   `Up/Down Arrow` (Navigate): Use the arrow keys to move the selection cursor up and down your list of tasks.

-   `Esc` (Exit): Press the `Esc` key at any time to exit the application. If you are in the middle of adding or editing a task, pressing `Esc` will cancel the current operation and return to the main view.

## Data Persistence

Your ToDo list data is automatically saved to a file named `todos.json` in the root directory of the project. This ensures that your tasks are preserved even after you close the application.

-   **`todos.json`**: This file stores all your ToDo items in a JSON format. You should not manually edit this file unless you know what you are doing, as it can corrupt your data.

    Example `todos.json` content:

    ```json
    [
      {
        "id": 1678886400000,
        "text": "Buy groceries",
        "completed": false
      },
      {
        "id": 1678886460000,
        "text": "Walk the dog",
        "completed": true
      }
    ]
    ```
