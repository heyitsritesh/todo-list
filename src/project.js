import querySelectors from './query-selectors.js';
import { rebuildTodo } from './todo.js';

// Array to store created project object
const projectList = [];

// Project ID Counter
let projectId = 1;

// Project Constructor Class
class Project {
    constructor(id, name, description, todos = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.todos = todos;
    }
}

// Default Project
(function () {
    const defaultProject = new Project(
        0,
        'Default Project',
        'This is a default project and all the todos without a project will go here'
    );
    projectList.push(defaultProject);
})();

// Funtion to create new project object and add it to array
function addNewProject() {
    let project = new Project(
        projectId++,
        querySelectors.projectTitle.value,
        querySelectors.projectDescription.value
    );

    projectList.push(project);
}

// Render Projects from Database
function renderProjectsDatabase() {
    for (let i = 0; i < projectList.length; i++) {
        let projectName = document.createElement('div');
        projectName.classList.add('project', `project-${projectList[i].id}`);
        projectName.innerHTML = `
        <h3>${projectList[i].name}</h3>
        <p>ID: ${projectList[i].id}</p>
        `;

        querySelectors.projectsSection.appendChild(projectName);
        let projectSelector = document.querySelector(
            `.project-${projectList[i].id}`
        );

        projectSelector.addEventListener('click', () => {
            rebuildTodo(projectList[i].todos);
        });
    }
}

// Rebuild Logic
function rebuildProject() {
    querySelectors.projectsSection.textContent = '';
    renderProjectsDatabase();
}

// Available Projects as Options Under Todo
function availableProjects() {
    querySelectors.todoProject.textContent = '';
    for (let project of projectList) {
        const selectObject = document.createElement('option');
        selectObject.setAttribute('value', project.id);
        selectObject.textContent = project.name;
        querySelectors.todoProject.appendChild(selectObject);
    }
}

export {
    renderProjectsDatabase,
    addNewProject,
    rebuildProject,
    availableProjects,
    projectList,
};
