(function () {
  const featuredGrid = document.getElementById('projects-grid');
  const mobileMenu = document.querySelector('.mobile-menu');

  function renderFeaturedProjects() {
    if (!featuredGrid) return;
    featuredGrid.innerHTML = '';
    PROJECTS.slice(0, 3).forEach((project, index) => {
      featuredGrid.appendChild(createShowcaseCard(project, index + 1));
    });
  }

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (mobileMenu) mobileMenu.classList.remove('open');
  }

  function setupNav() {
    document.querySelectorAll('[data-nav]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(link.dataset.nav);
      });
    });

    const sections = ['work', 'about', 'process', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('[data-nav]').forEach((link) => {
              link.classList.toggle('active', link.dataset.nav === entry.target.id);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  function setupHero() {
    document.getElementById('view-work-btn')?.addEventListener('click', () => {
      scrollToSection('work');
    });
  }

  renderFeaturedProjects();
  setupNav();
  setupMobileMenu();
  setupHero();
})();
