import './styles.css';
import querySelectors from './query-selectors.js';
import { addNewTodo, rebuildTodo, renderTodos } from './todo.js';
import {
    renderProjectsDatabase,
    addNewProject,
    rebuildProject,
    availableProjects,
} from './project.js';

//// Initialize available projects ////
availableProjects();

//// Show default project ////
renderProjectsDatabase();

//// All Todos ////
querySelectors.allTodos.addEventListener('click', () => {
    rebuildTodo();
});

//// "Add New Todo" Button Logic ////
addNewTodoBtn.addEventListener('click', () => {
    newTodoDialog.showModal();
});

//// "Add New Project" Button Logic ////
addNewProjectBtn.addEventListener('click', () => {
    newProjectDialog.showModal();
});

//// New Todo Form Submission Logic ////
addTodo.addEventListener('submit', event => {
    event.preventDefault(); // Disables default form behaviour
    addNewTodo(); // Adds todo item to database
    renderTodos(); // Render todos from database
    availableProjects(); // Syncs project dropdown with new projects
    rebuildTodo(); // Re-render todos
});

//// New Project Form Submission Logic ////
addProject.addEventListener('submit', event => {
    event.preventDefault(); // Disables default form behaviour
    addNewProject(); // Adds new project to database
    renderProjectsDatabase(); // Render projects from database
    availableProjects(); // Syncs project dropdown with new projects
    rebuildProject(); // Re-render projects
});
