import TodoItem from './todo-item.js';
import './styles.css';

const todoList = [];

// // Query Selectors // //

const todoSection = document.querySelector('#todo-section'); // Todo Section
const addTodo = document.querySelector('#addTodo'); // Todo Form
const todoTitle = document.querySelector('#todoTitle'); // Todo Title
const todoDescription = document.querySelector('#todoDescription'); // Todo Description
const dueDate = document.querySelector('#dueDate'); // Todo Due Date
const todoPriority = document.querySelector('#todoPriority'); // Todo Priority
const todoNotes = document.querySelector('#todoNotes'); // Todo Notes
const highPriority = document.querySelector('#high').textContent; // High Priority Option
const medPriority = document.querySelector('#medium').textContent; // Medium Priority Option
const lowPriority = document.querySelector('#low').textContent; // Low Priority Option

// Funtion to Create New Todo Item
function addNewTodo() {
    let todo = new TodoItem(
        todoTitle.value,
        todoDescription.value,
        dueDate.value,
        todoPriority.value,
        todoNotes.value
    );

    todoList.push(todo);
}

// Form Submission Logic
addTodo.addEventListener('submit', event => {
    event.preventDefault();
    addNewTodo();
    addTodoToDatabase();
    rebuild();
});

// Rebuild Logic
function rebuild() {
    todoSection.textContent = '';
    addTodoToDatabase();
}

// Priority Text
function priorityCheck(priority) {
    if (priority === 'high') {
        return highPriority;
    } else if (priority === 'medium') {
        return medPriority;
    } else if (priority === 'low') {
        return lowPriority;
    }
}

// Todo Database Logic
function addTodoToDatabase() {
    todoList.forEach((todo, index) => {
        let todoBox = document.createElement('div');
        todoBox.classList.add('todoBox');
        todoBox.innerHTML = `<h3>${todo.title}</h3><p>${
            todo.description
        }</p><p>${todo.dueDate}</p><p>${priorityCheck(todo.priority)}</p><p>${
            todo.notes
        }</p>`;
        todoSection.appendChild(todoBox);
    });
}
