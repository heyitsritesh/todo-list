import './styles.css';
import { addTodoToDatabase, addNewTodo, rebuildTodo } from './todo-item.js';
import { addProjectToList, addNewProject, rebuildProject } from './project.js';

// "Add New Todo" Button Logic
addNewTodoBtn.addEventListener('click', () => {
    newTodoDialog.showModal();
});

// "Add New Project" Button Logic
addNewProjectBtn.addEventListener('click', () => {
    newProjectDialog.showModal();
});

// New Todo Form Submission Logic
addTodo.addEventListener('submit', event => {
    event.preventDefault();
    addNewTodo();
    addTodoToDatabase();
    rebuildTodo();
});

// New Project Form Submission Logic
addProject.addEventListener('submit', event => {
    event.preventDefault();
    addNewProject();
    addProjectToList();
    rebuildProject();
});
