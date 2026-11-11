/* =========================================================
   Unipedia | shared/auth.js
   Shared logic for authentication pages.
   ========================================================= */
(() => {
  "use strict";

  const toggleButtons = document.querySelectorAll(".password-toggle");

  toggleButtons.forEach(button => {
    button.addEventListener("click", function () {
      // Find the input right before the button
      const input = this.previousElementSibling;
      const iconUse = this.querySelector("use");

      if (input.type === "password") {
        input.type = "text";
        iconUse.setAttribute("href", "#i-eye-off");
        this.setAttribute("aria-label", "Hide password");
      } else {
        input.type = "password";
        iconUse.setAttribute("href", "#i-eye");
        this.setAttribute("aria-label", "Show password");
      }
    });
  });
})();