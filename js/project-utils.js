function createShowcaseCard(project, number) {
  const card = document.createElement("article");
  card.className = "showcase-card";
  card.dataset.projectId = project.id;

  let imgHtml;
  if (project.image) {
    imgHtml = `<img src="${project.image}" alt="${project.name}" />`;
  } else if (project.emoji) {
    imgHtml = `<div class="showcase-img-placeholder">${project.emoji}</div>`;
  } else {
    imgHtml = `<div class="showcase-img-placeholder">📁</div>`;
  }

  const num = String(number).padStart(2, "0");

  card.innerHTML = `
    <div class="showcase-img-wrap" style="${project.imgStyle || ""}">
      ${imgHtml}
    </div>
    <div class="showcase-info">
      <div class="showcase-num">${num}</div>
      <div>
        <div class="showcase-title">${project.name}</div>
        <div class="showcase-subtitle">${project.subtitle}</div>
      </div>
    </div>`;

  card.addEventListener("click", () => {
    window.location.href = `project-detail.html?id=${project.id}`;
  });

  return card;
}

function createProjectCard(project, options = {}) {
  const { featured = false, compact = false } = options;
  const card = document.createElement("article");
  card.className = `project-card${featured ? " featured" : ""}`;
  card.dataset.projectId = project.id;

  let imgContent;
  if (project.image) {
    imgContent = `<img src="${project.image}" alt="${project.name}" class="project-img-display" style="width:100%; height:auto; display:block;"/>`;
  } else if (project.emoji) {
    imgContent = `<div style="font-size:40px;">${project.emoji}</div>`;
  } else {
    imgContent = `
      <div class="grid-overlay"></div>
      <div class="glow-orb"></div>
      <div style="z-index:1;text-align:center;">
        <div style="font-family:'Syne',sans-serif;font-size:${compact ? "22px" : "28px"};font-weight:700;color:#2C2420;letter-spacing:-1px;">${project.name}</div>
        <div style="font-size:12px;color:#C47B5A;margin-top:6px;font-weight:500;">${project.subtitle}</div>
      </div>`;
  }

  const tagsHtml = project.tags
    .map((tag) => {
      const isMain = project.mainTags.includes(tag);
      return `<span class="tag${isMain ? " main" : ""}">${tag}</span>`;
    })
    .join("");

  card.innerHTML = `
    <div class="project-img${project.image ? "" : " has-placeholder"}" style="${project.imgStyle}">
      ${imgContent}
    </div>
    <div class="project-body">
      <div class="project-tags" style="margin-bottom:10px;">${tagsHtml}</div>
      <div class="project-name">${project.name}</div>
      <div class="project-desc">${project.shortDesc}</div>
      <span class="project-link">${project.linkText}</span>
    </div>`;

  card.addEventListener("click", () => {
    window.location.href = `project-detail.html?id=${project.id}`;
  });

  return card;
}

function renderProjectDetail(project, container) {
  if (!project || !container) return;

  let heroContent;
  if (project.image) {
    heroContent = `<img src="${project.image}" alt="${project.name}" style="width:100%; height:auto; display:block;" />`;
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
    .join("");

  const responsibilitiesHtml = project.responsibilities
    .map((item) => `<li>${item}</li>`)
    .join("");

  const featuredScreens = project.featuredScreens || [];

  // Helper to build a gallery section
  function buildGallerySection(images, label, isMobileView, isTabletView) {
    if (!images || images.length === 0) return "";
    const itemsHtml = images
      .map(
        (src, i) => `
      <div class="gallery-item${featuredScreens.includes(i) ? " featured" : ""}">
        <img src="${src}" alt="${project.name} ${label} screen ${i + 1}" loading="lazy" />
      </div>`,
      )
      .join("");
    const gridClass = `gallery-grid${isMobileView ? " mobile-view" : ""}${isTabletView ? " tablet-view" : ""}`;
    return `
    <div class="detail-gallery">
      <h3>${label}</h3>
      <div class="${gridClass}">${itemsHtml}</div>
    </div>`;
  }

  let gallerySectionHtml = "";
  if (project.mobileGalleryImages || project.tabletGalleryImages) {
    // Champion-style: separate mobile and tablet sections
    gallerySectionHtml =
      buildGallerySection(project.mobileGalleryImages, "Mobile Screens", true, false) +
      buildGallerySection(project.tabletGalleryImages, "Tablet Screens", false, true);
  } else {
    // Standard: single gallery skipping index 0 (the hero/banner image)
    const images = (project.galleryImages || []).filter((_, i) => i !== 0);
    if (images.length > 0) {
      const itemsHtml = images
        .map(
          (src, i) => `
      <div class="gallery-item${featuredScreens.includes(i + 1) ? " featured" : ""}">
        <img src="${src}" alt="${project.name} screen ${i + 2}" loading="lazy" />
      </div>`,
        )
        .join("");
      gallerySectionHtml = `
    <div class="detail-gallery">
      <h3>Gallery</h3>
      <div class="gallery-grid${project.isMobile ? " mobile-view" : ""}">${itemsHtml}</div>
    </div>`;
    }
  }


  container.innerHTML = `
    <div class="detail-hero${project.image ? "" : " has-placeholder"}" style="${project.imgStyle}">${heroContent}</div>
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
    ${gallerySectionHtml}
    <div class="detail-footer">
      <div class="detail-section">
        <h3>Tech Stack</h3>
        <div class="project-tags">${tagsHtml}</div>
      </div>
      <div class="detail-actions">
        ${
          project.liveUrl
            ? `<a href="${project.liveUrl}" class="btn-primary" target="_blank" rel="noopener">View Live Site →</a>`
            : project.figmaUrl && project.figmaUrl !== "#"
              ? `<a href="${project.figmaUrl}" class="btn-primary" target="_blank" rel="noopener">View in Figma →</a>`
              : project.githubUrl && project.githubUrl !== "#"
                ? `<a href="${project.githubUrl}" class="btn-primary" target="_blank" rel="noopener">View on GitHub →</a>`
                : ""
        }
        <a href="projects.html" class="btn-ghost">← All projects</a>
      </div>
    </div>`;
}

function setupMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const navHamburger = document.querySelector(".nav-hamburger");

  if (navHamburger && mobileMenu) {
    navHamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }
}
