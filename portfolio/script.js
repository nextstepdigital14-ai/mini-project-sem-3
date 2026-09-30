document.getElementById("year").textContent = new Date().getFullYear();

// Header border on scroll
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const nav = document.getElementById("nav");
const toggle = document.getElementById("menu-toggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.textContent = open ? "Close" : "Menu";
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  }
});

// Highlight the current section in the nav
const links = [...nav.querySelectorAll("a")];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));

// Project filters
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
filters.forEach((btn) => btn.addEventListener("click", () => {
  filters.forEach((b) => b.classList.toggle("is-active", b === btn));
  const type = btn.dataset.filter;
  cards.forEach((card) => {
    card.hidden = !(type === "all" || card.dataset.category.split(" ").includes(type));
  });
}));

// Contact form: validates, then opens the visitor's email app
const form = document.getElementById("form");
const note = document.getElementById("note");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("input, textarea").forEach((field) => {
    const ok = field.value.trim() && field.checkValidity();
    field.setAttribute("aria-invalid", ok ? "false" : "true");
    if (!ok) valid = false;
  });
  if (!valid) {
    note.textContent = "Please fill in every field with a valid email address.";
    return;
  }
  const name = form.name.value.trim();
  const body = `${form.msg.value.trim()}\n\nFrom: ${name} (${form.mail.value.trim()})`;
  window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent("Message from " + name)}&body=${encodeURIComponent(body)}`;
  note.textContent = "Opening your email app. Thank you for getting in touch.";
  form.reset();
});
