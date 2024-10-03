import './styles.css';
import { addTodoToDatabase, addNewTodo, rebuildTodo } from './todo-item.js';
import {
    addProjectToList,
    addNewProject,
    rebuildProject,
    availableProjects,
    projectList,
} from './project.js';

availableProjects();

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
    availableProjects();
    rebuildTodo();
});

// New Project Form Submission Logic
addProject.addEventListener('submit', event => {
    event.preventDefault();
    addNewProject();
    addProjectToList();
    availableProjects();
    rebuildProject();
});
