function createShowcaseCard(project, number) {
  const card = document.createElement('article');
  card.className = 'showcase-card';
  card.dataset.projectId = project.id;

  let imgHtml;
  if (project.image) {
    imgHtml = `<img src="${project.image}" alt="${project.name}" />`;
  } else if (project.emoji) {
    imgHtml = `<div class="showcase-img-placeholder">${project.emoji}</div>`;
  } else {
    imgHtml = `<div class="showcase-img-placeholder">📁</div>`;
  }

  const num = String(number).padStart(2, '0');

  card.innerHTML = `
    <div class="showcase-img-wrap" style="${project.imgStyle || ''}">
      ${imgHtml}
    </div>
    <div class="showcase-info">
      <div class="showcase-num">${num}</div>
      <div>
        <div class="showcase-title">${project.name}</div>
        <div class="showcase-subtitle">${project.subtitle}</div>
      </div>
    </div>`;

  card.addEventListener('click', () => {
    window.location.href = `project-detail.html?id=${project.id}`;
  });

  return card;
}

function createProjectCard(project, options = {}) {
  const { featured = false, compact = false } = options;
  const card = document.createElement('article');
  card.className = `project-card${featured ? ' featured' : ''}`;
  card.dataset.projectId = project.id;

  let imgContent;
  if (project.image) {
    imgContent = `
      <img src="${project.image}" alt="${project.name}" class="project-img-display" style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0; opacity:0.85; transition:all 0.4s cubic-bezier(0.4, 0, 0.2, 1);"/>
      <div class="grid-overlay" style="opacity:0.1;"></div>
      <div style="z-index:1;text-align:center;background:rgba(44,36,32,0.45);width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(1px);transition:all 0.3s ease;" class="img-overlay-text">
        <div style="font-family:'Syne',sans-serif;font-size:${compact ? '20px' : '26px'};font-weight:700;color:#fff;letter-spacing:-1px;text-shadow:0 2px 8px rgba(0,0,0,0.9);">${project.name}</div>
        <div style="font-size:11px;color:#E8D5CC;margin-top:4px;font-weight:500;text-shadow:0 1px 4px rgba(0,0,0,0.9);">${project.subtitle}</div>
      </div>`;
  } else if (project.emoji) {
    imgContent = `<div style="font-size:40px;">${project.emoji}</div>`;
  } else {
    imgContent = `
      <div class="grid-overlay"></div>
      <div class="glow-orb"></div>
      <div style="z-index:1;text-align:center;">
        <div style="font-family:'Syne',sans-serif;font-size:${compact ? '22px' : '28px'};font-weight:700;color:#2C2420;letter-spacing:-1px;">${project.name}</div>
        <div style="font-size:12px;color:#C47B5A;margin-top:6px;font-weight:500;">${project.subtitle}</div>
      </div>`;
  }

  const tagsHtml = project.tags
    .map((tag) => {
      const isMain = project.mainTags.includes(tag);
      return `<span class="tag${isMain ? ' main' : ''}">${tag}</span>`;
    })
    .join('');

  card.innerHTML = `
    <div class="project-img" style="${project.imgStyle}">
      ${imgContent}
    </div>
    <div class="project-body">
      <div class="project-tags" style="margin-bottom:10px;">${tagsHtml}</div>
      <div class="project-name">${project.name}</div>
      <div class="project-desc">${project.shortDesc}</div>
      <span class="project-link">${project.linkText}</span>
    </div>`;

  card.addEventListener('click', () => {
    window.location.href = `project-detail.html?id=${project.id}`;
  });

  return card;
}

function renderProjectDetail(project, container) {
  if (!project || !container) return;

  let heroContent;
  if (project.image) {
    heroContent = `
      <img src="${project.image}" alt="${project.name}" style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0; opacity:0.65;" />
      <div class="grid-overlay" style="opacity:0.15;"></div>
      <div style="z-index:1;text-align:center;">
        <div class="detail-hero-title" style="text-shadow:0 4px 12px rgba(0,0,0,0.95);">${project.name}</div>
        <div class="detail-hero-sub" style="text-shadow:0 2px 6px rgba(0,0,0,0.95); font-weight:600; color:#E8D5CC;">${project.subtitle}</div>
      </div>`;
  } else if (project.emoji) {
    heroContent = `<div style="font-size:64px;">${project.emoji}</div>`;
  } else {
    heroContent = `
      <div class="grid-overlay"></div>
      <div class="glow-orb"></div>
      <div>
        <div class="detail-hero-title">${project.name}</div>
        <div class="detail-hero-sub">${project.subtitle}</div>
      </div>`;
  }

  const tagsHtml = project.techStack
    .map((tag) => `<span class="tag main">${tag}</span>`)
    .join('');

  const responsibilitiesHtml = project.responsibilities
    .map((item) => `<li>${item}</li>`)
    .join('');

  container.innerHTML = `
    <div class="detail-hero" style="${project.imgStyle}">${heroContent}</div>
    <div class="detail-meta">
      <div class="detail-meta-item"><span>Year:</span> ${project.year}</div>
      <div class="detail-meta-item"><span>Role:</span> ${project.role}</div>
      <div class="detail-meta-item"><span>Client:</span> ${project.client}</div>
    </div>
    <div class="detail-body">
      <div class="detail-section">
        <h3>Overview</h3>
        <p>${project.overview}</p>
      </div>
      <div class="detail-section">
        <h3>What I worked on</h3>
        <ul class="detail-list">${responsibilitiesHtml}</ul>
      </div>
    </div>
    <div class="detail-footer">
      <div class="detail-section">
        <h3>Tech Stack</h3>
        <div class="project-tags">${tagsHtml}</div>
      </div>
      <div class="detail-actions">
        ${project.liveUrl !== '#' ? `<a href="${project.liveUrl}" class="btn-primary" target="_blank" rel="noopener">Live demo →</a>` : ''}
        ${project.githubUrl !== '#' ? `<a href="${project.githubUrl}" class="btn-ghost" target="_blank" rel="noopener">View on GitHub</a>` : ''}
        <a href="projects.html" class="btn-ghost">← All projects</a>
      </div>
    </div>`;
}

function setupMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const navHamburger = document.querySelector('.nav-hamburger');

  if (navHamburger && mobileMenu) {
    navHamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }
}
