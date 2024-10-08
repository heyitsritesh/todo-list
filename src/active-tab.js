export default function activeTab(clickedTab) {
    const tabs = [...document.querySelectorAll('.project, #allTodos')];
    tabs.forEach(tab => tab.classList.remove('active'));

    clickedTab.classList.add('active');
}
