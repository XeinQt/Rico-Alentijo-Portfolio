(function () {
  const detailContent = document.getElementById('project-detail-content');
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    if (detailContent) {
      detailContent.innerHTML = `
        <div class="detail-section">
          <h3>Project not found</h3>
          <p>The project you're looking for doesn't exist.</p>
          <div class="detail-actions">
            <a href="projects.html" class="btn-primary">← Back to all projects</a>
          </div>
        </div>`;
    }
    document.title = 'Project not found — dev.portfolio';
    return;
  }

  document.title = `${project.name} — dev.portfolio`;

  const pageTitle = document.querySelector('.page-header .section-title');
  if (pageTitle) pageTitle.textContent = project.name;

  renderProjectDetail(project, detailContent);
  setupMobileMenu();
})();
