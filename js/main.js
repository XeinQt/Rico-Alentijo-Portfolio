// main.js - Homepage wiring
// Renders the Selected Projects grid and sets up page interactions.

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupMobileMenuCloseOnLinkClick();
  renderProjectsGrid();
  setupViewWorkButton();
  setupNavActiveState();
});

function renderProjectsGrid() {
  const grid = document.getElementById("projects-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  grid.innerHTML = "";
  // Render projects using the premium project card design
  PROJECTS.forEach((project) => {
    // If the project is featured, we can render it as featured or regular.
    // The user's design shows a standard project card layout (featured: false).
    const card = createProjectCard(project, { featured: false });
    grid.appendChild(card);
  });
}

function setupMobileMenuCloseOnLinkClick() {
  const mobileMenu = document.querySelector(".mobile-menu");
  if (!mobileMenu) return;

  const links = mobileMenu.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
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
    .map((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        return document.querySelector(href);
      }
      return null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === `#${id}` || link.dataset.nav === id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}
