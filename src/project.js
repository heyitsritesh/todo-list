import querySelectors from './query-selectors.js';

// Array to store created project object
const projectList = [];

// Project ID Counter
let projectId = 1;

// Project Constructor Class
class Project {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
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

// Project List Logic
function addProjectToList() {
    for (let i = 1; i < projectList.length; i++) {
        let projectName = document.createElement('div');
        projectName.classList.add('projectName');
        projectName.innerHTML = `
        <h3>${projectList[i].name}</h3>
        <p>${projectList[i].id}</p>
        <p>${projectList[i].description}</p>
        `;
        querySelectors.projectsSection.appendChild(projectName);
    }
}

// Rebuild Logic
function rebuildProject() {
    querySelectors.projectsSection.textContent = '';
    addProjectToList();
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
    addProjectToList,
    addNewProject,
    rebuildProject,
    availableProjects,
    projectList,
};
