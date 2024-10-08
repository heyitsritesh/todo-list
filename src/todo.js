import querySelectors from './query-selectors.js';
import { projectList } from './project.js';

// Array to store created todo item object
const todoList = [];

// Todo ID Counter
let todoId = 1;

// Todo Item Constructor Class
class TodoItem {
    constructor(id, title, description, dueDate, priority, notes, projectId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.projectId = projectId;
    }
}

// Function to create new todo item object and add it to array
function addNewTodo() {
    let todo = new TodoItem(
        todoId++,
        querySelectors.todoTitle.value,
        querySelectors.todoDescription.value,
        querySelectors.dueDate.value,
        querySelectors.todoPriority.value,
        querySelectors.todoNotes.value,
        Number(querySelectors.todoProject.value)
    );

    todoList.push(todo);

    const project = projectFinder(todo.projectId);
    if (project) {
        project.todos.push(todo.id);
    } else {
        console.error(
            `Project not found for new todo. Project ID: ${todo.projectId}`
        );
    }

    console.log('New todo added:', todo);
    return todo;
}

// Todo Update Logic
function updateTodo(todoData) {
    let [todoId, currentProjectId] = todoData.split(',').map(Number);
    let todoToUpdate = todoList.find(todo => todo.id === todoId);

    if (!todoToUpdate) {
        console.error(`Todo not found for ID: ${todoId}`);
        return;
    }

    // Create a new TodoItem instance with updated values
    let updatedTodo = new TodoItem(
        todoId, // Keep the original ID
        querySelectors.todoTitle.value,
        querySelectors.todoDescription.value,
        querySelectors.dueDate.value,
        querySelectors.todoPriority.value,
        querySelectors.todoNotes.value,
        Number(querySelectors.todoProject.value)
    );

    // Handle project change
    if (currentProjectId !== updatedTodo.projectId) {
        let oldProject = projectFinder(currentProjectId);
        let newProject = projectFinder(updatedTodo.projectId);

        if (oldProject) {
            oldProject.todos = oldProject.todos.filter(id => id !== todoId);
        }

        if (newProject) {
            if (!newProject.todos.includes(todoId)) {
                newProject.todos.push(todoId);
            }
        }
    }

    // Update the todo in the todoList
    let indexToUpdate = todoList.findIndex(todo => todo.id === todoId);
    if (indexToUpdate !== -1) {
        todoList[indexToUpdate] = updatedTodo;
    }

    console.log('Todo updated:', updatedTodo);
    console.log('Updated todoList:', todoList);

    rebuildCurrentTab();
}

// Find Project by ID
function projectFinder(id) {
    const project = projectList.find(project => project.id === Number(id));
    if (!project) {
        console.error(`Project not found for ID: ${id}`);
        console.log('Available projects:', projectList);
    }
    return project;
}

// Find Todo by ID
function todoFinder(id) {
    return todoList.find(todo => todo.id === Number(id));
}

// Get Todo Index
function todoIndexFinder(id) {
    return todoList.indexOf(id);
}

// Render Filtered Todos from Database
function renderTodos(todoIds) {
    if (arguments.length === 0) {
        todoList.forEach(todo => {
            if (todo) {
                todoConstructor(todo);
            } else {
                console.error('Encountered undefined todo in todoList');
            }
        });
    } else {
        todoIds.forEach(todoId => {
            const todo = todoFinder(todoId);
            if (todo) {
                todoConstructor(todo);
            } else {
                console.error(`Todo not found for ID: ${todoId}`);
            }
        });
    }
}

// Todo Item Constructor
function todoConstructor(todoData) {
    let matchingProject = projectFinder(todoData.projectId);
    if (!matchingProject) {
        console.error(`Project not found for ID: ${todoData.projectId}`);
        return;
    }
    if (!matchingProject.todos.includes(todoData.id)) {
        matchingProject.todos.push(todoData.id);
    }
    let todoBox = document.createElement('div');
    todoBox.classList.add('todoBox', todoData.priority);
    todoBox.innerHTML = `
        <span class="todo-title">${todoData.title}</span>
        <button class="todo-delete">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
    `;
    querySelectors.todoSection.appendChild(todoBox);

    todoBox.addEventListener('click', e => {
        if (!e.target.closest('.todo-delete')) {
            todoItemModal(todoData);
        }
    });

    todoBox.querySelector('.todo-delete').addEventListener('click', event => {
        event.stopPropagation();
        deleteTodo(todoData, event);
    });
}

// Todo Delete
function deleteTodo(todo, event) {
    event.stopPropagation();
    let todoIndex = todoIndexFinder(todo);
    if (todoIndex > -1) {
        todoList.splice(todoIndex, 1);

        let project = projectFinder(todo.projectId);
        let projectTodoIndex = project.todos.indexOf(todo.id);
        if (projectTodoIndex > -1) {
            project.todos.splice(projectTodoIndex, 1);
        }

        rebuildCurrentTab();
    }
}

// Todo Item Modal
function todoItemModal(todoData) {
    let matchingProject = projectFinder(+todoData.projectId);
    const todoModal = querySelectors.todoItemModal;
    todoModal.innerHTML = `
        <h3>${todoData.title}</h3>
        <p>Todo ID: ${todoData.id}</p>
        <p>${todoData.description}</p>
        <p>${todoData.dueDate}</p>
        <p>${priorityCheck(todoData.priority)}</p>
        <p>${todoData.notes}</p>
        <p>Project ID: ${todoData.projectId}</p>
        <p>Project name: ${matchingProject.name}</p>
        <button id="editTodoBtn">Edit</button>
        <button id="closeTodoModalBtn">Close</button>
    `;

    document.getElementById('editTodoBtn').addEventListener('click', () => {
        todoModal.close();
        newTodoDialog.showModal();
        querySelectors.addTodo.setAttribute('data-mode', 'edit');
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.value = `${todoData.id},${todoData.projectId}`;
        querySelectors.addTodo.appendChild(hiddenInput);
        document.querySelector('#addTodoItem').textContent = 'Update';

        // Populate form fields with current todo data
        querySelectors.todoTitle.value = todoData.title;
        querySelectors.todoDescription.value = todoData.description;
        querySelectors.dueDate.value = todoData.dueDate;
        querySelectors.todoPriority.value = todoData.priority;
        querySelectors.todoNotes.value = todoData.notes;
        querySelectors.todoProject.value = todoData.projectId;
    });

    document
        .getElementById('closeTodoModalBtn')
        .addEventListener('click', () => {
            todoModal.close();
        });

    todoModal.showModal();
}

// Priority Text
function priorityCheck(priority) {
    if (priority === 'high') {
        return querySelectors.highPriority;
    } else if (priority === 'medium') {
        return querySelectors.medPriority;
    } else if (priority === 'low') {
        return querySelectors.lowPriority;
    }
}

// Rebuild Logic
function rebuildTodo(filter) {
    console.log('Rebuilding todo with filter:', filter);
    querySelectors.todoSection.textContent = '';

    if (filter === undefined) {
        console.log('Rendering all todos:', todoList);
        renderTodos();
    } else {
        console.log('Rendering filtered todos:', filter);
        renderTodos(filter);
    }
}

// Rebuild Current Tab
function rebuildCurrentTab() {
    const activeTab = document.querySelector('.active');
    console.log('Rebuilding current tab:', activeTab.id);
    if (activeTab.id === 'allTodos') {
        rebuildTodo();
    } else {
        const projectId = parseInt(activeTab.classList[1].split('-')[1]);
        const project = projectFinder(projectId);
        if (project) {
            console.log(
                'Rebuilding project:',
                project.name,
                'Todos:',
                project.todos
            );
            rebuildTodo(project.todos);
        } else {
            console.error(`Project not found for ID: ${projectId}`);
            rebuildTodo();
        }
    }
}

export {
    TodoItem,
    todoList,
    addNewTodo,
    rebuildTodo,
    renderTodos,
    updateTodo,
    rebuildCurrentTab,
};
