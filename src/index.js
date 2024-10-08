import './styles.css';
import querySelectors from './query-selectors.js';
import {
    addNewTodo,
    rebuildTodo,
    updateTodo,
    rebuildCurrentTab,
} from './todo.js';
import {
    renderProjectsDatabase,
    addNewProject,
    rebuildProject,
    availableProjects,
} from './project.js';
import activeTab from './active-tab.js';

//// Initialize available projects ////
availableProjects();

//// Show default project ////
renderProjectsDatabase();

//// All Todos ////
querySelectors.allTodos.addEventListener('click', () => {
    rebuildTodo();
    activeTab(querySelectors.allTodos);
});

//// "Add New Todo" Button Logic ////
querySelectors.addNewTodoBtn.addEventListener('click', () => {
    newTodoDialog.showModal();
    querySelectors.addTodo.reset();
    querySelectors.addTodo.setAttribute('data-mode', 'add');
});

//// "Add New Project" Button Logic ////
querySelectors.addNewProjectBtn.addEventListener('click', () => {
    newProjectDialog.showModal();
});

//// New Todo Form Submission Logic ////
querySelectors.addTodo.addEventListener('submit', event => {
    event.preventDefault();
    if (querySelectors.addTodo.getAttribute('data-mode') == 'add') {
        const newTodo = addNewTodo();
        console.log('New todo added:', newTodo);
    } else if (querySelectors.addTodo.getAttribute('data-mode') == 'edit') {
        const hiddenInput = querySelectors.addTodo.querySelector(
            'input[type="hidden"]'
        );
        if (hiddenInput) {
            updateTodo(hiddenInput.value);
            hiddenInput.remove(); // Remove the hidden input after use
        } else {
            console.error('Hidden input for todo ID not found');
        }
    }

    availableProjects();
    rebuildCurrentTab();
    newTodoDialog.close(); // Close the dialog after submission
});

//// New Project Form Submission Logic ////
querySelectors.addProject.addEventListener('submit', event => {
    event.preventDefault(); // Disables default form behaviour
    addNewProject(); // Adds new project to database
    renderProjectsDatabase(); // Render projects from database
    availableProjects(); // Syncs project dropdown with new projects
    rebuildProject(); // Re-render projects
});
