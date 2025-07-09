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

## Data Persistence

Your ToDo list data is automatically saved to a file named `todos.json` in the root directory of the project. This ensures that your tasks are preserved even after you close the application.

-   **`todos.json`**: This file stores all your ToDo items in a JSON format. You should not manually edit this file unless you know what you are doing, as it can corrupt your data.

    Example `todos.json` content:

    ```json
    [
      {
        "id": 1,
        "text": "Buy groceries",
        "completed": false,
        "dueDate": "2025-12-20"
      },
      {
        "id": 2,
        "text": "Walk the dog",
        "completed": true
      }
    ]
    ```