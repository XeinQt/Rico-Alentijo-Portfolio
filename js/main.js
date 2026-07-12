(function () {
  const featuredGrid = document.getElementById("projects-grid");
  const mobileMenu = document.querySelector(".mobile-menu");

  function renderFeaturedProjects() {
    if (!featuredGrid) return;
    featuredGrid.innerHTML = "";
    PROJECTS.slice(0, 3).forEach((project, index) => {
      featuredGrid.appendChild(createShowcaseCard(project, index + 1));
    });
  }

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (mobileMenu) mobileMenu.classList.remove("open");
  }

  function setupNav() {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection(link.dataset.nav);
      });
    });

    const sections = ["work", "about", "process", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll("[data-nav]").forEach((link) => {
              link.classList.toggle(
                "active",
                link.dataset.nav === entry.target.id,
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  function setupHero() {
    document.getElementById("view-work-btn")?.addEventListener("click", () => {
      scrollToSection("work");
    });
  }

  renderFeaturedProjects();
  setupNav();
  setupMobileMenu();
  setupHero();
})();

// main.js - Homepage wiring
// Renders the Selected Projects grid and sets up basic page interactions.

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  renderProjectsGrid();
  setupViewWorkButton();
  setupNavActiveState();
});

function renderProjectsGrid() {
  const grid = document.getElementById("projects-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  grid.innerHTML = "";
  PROJECTS.forEach((project, i) => {
    const card = createShowcaseCard(project, i + 1);
    grid.appendChild(card);
  });
}

function setupViewWorkButton() {
  const btn = document.getElementById("view-work-btn");
  const workSection = document.getElementById("work");
  if (btn && workSection) {
    btn.addEventListener("click", () => {
      workSection.scrollIntoView({ behavior: "smooth" });
    });
  }
}

function setupNavActiveState() {
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.nav === id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}
