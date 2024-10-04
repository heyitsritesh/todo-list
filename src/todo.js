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

// Funtion to create new todo item object and add it to array
function addNewTodo() {
    let todo = new TodoItem(
        todoId++,
        querySelectors.todoTitle.value,
        querySelectors.todoDescription.value,
        querySelectors.dueDate.value,
        querySelectors.todoPriority.value,
        querySelectors.todoNotes.value,
        querySelectors.todoProject.value
    );

    todoList.push(todo);
}

// Find Project by ID
function projectFinder(id) {
    return projectList.find(project => project.id === id);
}

// Find Todo by ID
function todoFinder(id) {
    return todoList.find(todo => todo.id === id);
}

// Render Filtered Todos from Database
function renderTodos(todoIds) {
    // Default All Todo Renderer
    if (arguments.length === 0) {
        todoList.forEach(todo => {
            todoConstructor(todo);
        });
        return;
    }

    // Filtered Todo Renderer
    todoIds.forEach(todo => {
        let matchingTodo = todoFinder(todo);
        todoConstructor(matchingTodo);
    });
}

// Todo Item Constructor
function todoConstructor(todoData) {
    let matchingProject = projectFinder(+todoData.projectId); // Finds project by ID
    if (!matchingProject.todos.includes(+todoData.id)) {
        matchingProject.todos.push(+todoData.id); // Adds todo ID to project
    }
    let todoBox = document.createElement('div');
    todoBox.classList.add('todoBox');
    todoBox.innerHTML = `
            <h3>${todoData.title}</h3>
            <p>Todo ID: ${todoData.id}</p>
            <p>${todoData.description}</p>
            <p>${todoData.dueDate}</p>
            <p>${priorityCheck(todoData.priority)}</p>
            <p>${todoData.notes}</p>
            <p>Project ID: ${todoData.projectId}</p>
            <p>Project name: ${matchingProject.name}</p>
            `;
    querySelectors.todoSection.appendChild(todoBox);
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
    querySelectors.todoSection.textContent = '';

    if (filter === undefined) {
        renderTodos();
    } else {
        renderTodos(filter);
    }
}

export { TodoItem, todoList, addNewTodo, rebuildTodo, renderTodos };
