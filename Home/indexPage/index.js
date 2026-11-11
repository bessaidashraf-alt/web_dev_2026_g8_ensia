/* =========================================================
   Unipedia | indexPage/index.js

   1. Scroll-spy: highlights the nav link of the section you read.
   2. Reveal: cards fade in as they scroll into view.

   The mobile menu is in ../shared/base.js (shared by all pages).
   ========================================================= */
(() => {
  "use strict";

  if (!("IntersectionObserver" in window)) return; // page still works without it

  /* ---------- 1. SCROLL-SPY ---------- */
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = [...document.querySelectorAll("main section")];

  function setActive(id) {
    navLinks.forEach((link) => {
      if (id && link.getAttribute("href") === `#${id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // A section counts as "current" while it crosses the middle of the screen
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => spy.observe(section));

  /* ---------- 2. REVEAL ON SCROLL ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const items = document.querySelectorAll(".service, .step, .choice, .banner");

  const reveal = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => {
    // Small stagger between cards in the same row
    const position = Array.prototype.indexOf.call(item.parentElement.children, item);
    item.style.transitionDelay = `${(position % 3) * 90}ms`;
    item.classList.add("reveal");
    reveal.observe(item);
  });
})();