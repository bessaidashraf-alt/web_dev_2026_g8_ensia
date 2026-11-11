/* =========================================================
   Unipedia | shared/base.js
   Linked by every page that uses the public header:
     <script src="../shared/base.js" defer></script>
   (one more "../" on nested pages like indexPage/about/)

   Mobile menu: opens/closes the header nav on small screens.
   ========================================================= */
(() => {
  "use strict";

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  const isOpen = () => nav.classList.contains("is-open");

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  // Button opens/closes the menu
  toggle.addEventListener("click", () => setOpen(!isOpen()));

  // Choosing a link closes the menu
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  // Click outside closes it
  document.addEventListener("click", (event) => {
    if (isOpen() && !nav.contains(event.target) && !toggle.contains(event.target)) {
      setOpen(false);
    }
  });

  // Escape closes it and returns focus to the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Growing the window past the mobile breakpoint resets the menu
  window.matchMedia("(min-width: 821px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
})();