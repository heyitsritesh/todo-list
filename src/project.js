import querySelectors from './query-selectors.js';

// Array to store created project object
const projectList = [];

// Project Constructor Class
class Project {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

// Funtion to create new project object and add it to array
function addNewProject() {
    let project = new Project(
        querySelectors.projectTitle.value,
        querySelectors.projectDescription.value
    );

    projectList.push(project);
}

// Project List Logic
function addProjectToList() {
    projectList.forEach((project, index) => {
        let projectName = document.createElement('div');
        projectName.classList.add('projectName');
        projectName.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p>`;
        querySelectors.projectsSection.appendChild(projectName);
    });
}

// Rebuild Logic
function rebuildProject() {
    querySelectors.projectsSection.textContent = '';
    addProjectToList();
}

export { addProjectToList, addNewProject, rebuildProject };
