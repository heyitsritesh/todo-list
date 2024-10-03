const querySelectors = {
    todoSection: document.querySelector('#todo-section'),
    projectsSection: document.querySelector('#projects-section'),
    addTodo: document.querySelector('#addTodo'),
    addProject: document.querySelector('#addProject'),
    todoTitle: document.querySelector('#todoTitle'),
    todoDescription: document.querySelector('#todoDescription'),
    dueDate: document.querySelector('#dueDate'),
    todoPriority: document.querySelector('#todoPriority'),
    todoNotes: document.querySelector('#todoNotes'),
    highPriority: document.querySelector('#high')?.textContent,
    medPriority: document.querySelector('#medium')?.textContent,
    lowPriority: document.querySelector('#low')?.textContent,
    newTodoDialog: document.querySelector('#newTodoDialog'),
    addNewTodoBtn: document.querySelector('#addNewTodoBtn'),
    newProjectDialog: document.querySelector('#newProjectDialog'),
    addNewProjectBtn: document.querySelector('#addNewProjectBtn'),
    projectTitle: document.querySelector('#projectTitle'),
    projectDescription: document.querySelector('#projectDescription'),
};

export default querySelectors;
