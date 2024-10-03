import querySelectors from './query-selectors.js';

// Array to store created todo item object
const todoList = [];

// Todo Item Constructor Class
class TodoItem {
    constructor(title, description, dueDate, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }
}

// Funtion to create new todo item object and add it to array
function addNewTodo() {
    let todo = new TodoItem(
        querySelectors.todoTitle.value,
        querySelectors.todoDescription.value,
        querySelectors.dueDate.value,
        querySelectors.todoPriority.value,
        querySelectors.todoNotes.value
    );

    todoList.push(todo);
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
        querySelectors.todoSection.appendChild(todoBox);
    });
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
function rebuildTodo() {
    querySelectors.todoSection.textContent = '';
    addTodoToDatabase();
}

export { TodoItem, addTodoToDatabase, todoList, addNewTodo, rebuildTodo };
