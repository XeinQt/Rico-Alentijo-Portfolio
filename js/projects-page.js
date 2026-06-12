(function () {
  const allProjectsGrid = document.getElementById('all-projects-grid');

  function renderAllProjects() {
    if (!allProjectsGrid) return;
    allProjectsGrid.innerHTML = '';
    PROJECTS.forEach((project) => {
      allProjectsGrid.appendChild(createProjectCard(project, { compact: true }));
    });
  }

  renderAllProjects();
  setupMobileMenu();
})();
