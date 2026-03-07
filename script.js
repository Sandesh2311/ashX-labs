const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const yearSpan = document.querySelector("#year");
const revealEls = document.querySelectorAll(".fade-up");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("open");
  });
}

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const setActiveNav = () => {
  const scrollY = window.scrollY + 140;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const targetLink = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!targetLink) return;
    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach((item) => item.classList.remove("active"));
      targetLink.classList.add("active");
    }
  });
};

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.9;
  revealEls.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add("show");
  });
};

window.addEventListener("scroll", () => {
  setActiveNav();
  revealOnScroll();
});

window.addEventListener("load", () => {
  setActiveNav();
  revealOnScroll();
});

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
