(function () {
  "use strict";

  // ---------- Small helpers ----------
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // Show a message just above a form (success or error)
  function showMessage(form, text, type) {
    let box = form.previousElementSibling;
    if (!box || !box.classList.contains("message")) {
      box = document.createElement("p");
      box.className = "message";
      box.setAttribute("role", "status");
      form.before(box);
    }
    box.dataset.type = type || "info";
    box.textContent = text;
  }

  // Give status words (Pending, Accepted...) a style hook for the CSS
  const STATUSES = ["pending", "accepted", "scheduled", "completed",
                  "rejected", "cancelled", "active", "inactive",
                  "teach", "learn"];
  function decorateStatus(element) {
    const word = element.textContent.trim().toLowerCase();
    if (STATUSES.includes(word)) element.dataset.status = word;
  }

  function setStatus(element, word) {
    element.textContent = word;
    decorateStatus(element);
  }

  // ---------- All pages ----------
  function initCommon() {
    // Highlight the current page in the Skills Exchange sub-menu
    const here = location.pathname.split("/").pop() || "index.html";
    $$('nav[aria-label="Skills Exchange sections"] a').forEach((link) => {
      if (link.getAttribute("href") === here) link.setAttribute("aria-current", "page");
    });

    // Placeholder links (href="#") should not jump to the top of the page
    $$('a[href="#"]').forEach((link) =>
      link.addEventListener("click", (event) => event.preventDefault())
    );

    // Style every status word found on the page
    $$("article strong, tbody td").forEach(decorateStatus);

    // Character counter under every textarea that has a maxlength
    $$("textarea[maxlength]").forEach((box) => {
      const counter = document.createElement("small");
      box.after(counter);
      const update = () => (counter.textContent = box.value.length + " / " + box.maxLength);
      box.addEventListener("input", update);
      update();
    });
  }

  // ---------- Page 1: browse-skills.html ----------
  function initBrowse() {
    const form = $('form[role="search"]');
    const list = $('section[aria-label="Skill listings"]');
    if (!form || !list) return;

    const cards = $$("article", list);
    const emptyState = $('section[aria-label="No results"]');
    const counter = $$("main > p").find((p) => /^Showing/.test(p.textContent));
    const pagination = $('nav[aria-label="Pagination"]');

    // Read what each card says: type, category, and all its text
    const data = cards.map((card) => {
      const parts = $("strong", card).parentElement.textContent
        .split("·").map((part) => part.trim().toLowerCase());
      return { card, type: parts[0], category: parts[1] || "", text: card.textContent.toLowerCase() };
    });

    // Fill the form from the web address (for example ?q=python)
    const params = new URLSearchParams(location.search);
    ["q", "type", "category"].forEach((name) => {
      if (params.has(name)) form.elements[name].value = params.get(name);
    });

    function applyFilters() {
      const q = form.elements.q.value.trim().toLowerCase();
      const type = form.elements.type.value.toLowerCase();
      const category = form.elements.category.value.toLowerCase();
      let visible = 0;

      data.forEach((item) => {
        const match =
          (!q || item.text.includes(q)) &&
          (!type || item.type === type) &&
          (!category || item.category === category);
        item.card.hidden = !match;
        if (match) visible++;
      });

      if (counter) counter.textContent = "Showing " + visible + " active listing" + (visible === 1 ? "" : "s");
      if (emptyState) emptyState.hidden = visible > 0;
      if (pagination) pagination.hidden = visible === 0;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      applyFilters();
    });
    form.addEventListener("input", applyFilters);

    // "Clear filters" resets everything
    const clear = $('a[href="browse-skills.html"]', form);
    if (clear) {
      clear.addEventListener("click", (event) => {
        event.preventDefault();
        form.elements.q.value = "";
        form.elements.type.value = "";
        form.elements.category.value = "";
        applyFilters();
      });
    }

    applyFilters();
  }

  // ---------- Page 3: my-skills.html ----------
  function initMySkills() {
    const table = $("table");
    const emptyState = $('section[aria-label="No listings yet"]');
    if (!table || !emptyState) return;

    function refreshEmptyState() {
      const rows = $$("tbody tr", table).length;
      table.hidden = rows === 0;
      emptyState.hidden = rows > 0;
    }

    $$("tbody form", table).forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const button = event.submitter || $("button", form);
        const row = form.closest("tr");
        const statusCell = row.cells[3];

        if (button.value === "deactivate") {
          if (!confirm("Deactivate this listing? It will no longer appear in search.")) return;
          setStatus(statusCell, "Inactive");
          button.value = "activate";
          button.textContent = "Activate";
        } else {
          setStatus(statusCell, "Active");
          button.value = "deactivate";
          button.textContent = "Deactivate";
        }
      });
    });

    refreshEmptyState();
  }

  // ---------- Page 5: exchange-requests.html ----------
  function initRequests() {
    const articles = $$("main article");
    const emptyState = $('section[aria-label="No requests"]');
    if (!emptyState || !$('nav[aria-label="Request direction"]')) return;

    const RESULT = { accept: "Accepted", reject: "Rejected", cancel: "Cancelled" };
    const ASK = {
      reject: "Reject this request? This cannot be undone.",
      cancel: "Cancel this? This cannot be undone."
    };

    articles.forEach((article) => {
      const form = $("form", article);
      if (!form) return;

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const action = (event.submitter || $("button", form)).value;
        if (ASK[action] && !confirm(ASK[action])) return;

        const line = $$("p", article).find((p) => p.textContent.includes("Status:"));
        if (line) setStatus($("strong", line), RESULT[action]);

        // An accepted request can now be scheduled
        if (action === "accept") {
          const id = form.elements.request_id.value;
          const link = document.createElement("a");
          link.href = "schedule-session.html?request=" + id;
          link.textContent = "Schedule session";
          form.replaceWith(link);
        } else {
          form.remove();
        }
      });
    });

    // The empty message only shows when there are no requests at all
    emptyState.hidden = articles.length > 0;
  }

  // ---------- Page 6: schedule-session.html ----------
  function initSchedule() {
    const form = $("#session-date") && $("#session-date").form;
    if (!form) return;

    // Block past days in the date picker
    const now = new Date();
    const today = now.getFullYear() + "-" +
      String(now.getMonth() + 1).padStart(2, "0") + "-" +
      String(now.getDate()).padStart(2, "0");
    $("#session-date").min = today;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const date = $("#session-date").value;
      const start = $("#start-time").value;
      const end = $("#end-time").value;

      if (new Date(date + "T" + start) <= new Date()) {
        showMessage(form, "Choose a date and start time in the future.", "error");
        return;
      }
      if (end <= start) {
        showMessage(form, "The end time must be after the start time.", "error");
        return;
      }
      showMessage(form, "Session confirmed for " + date + " from " + start + " to " + end + ".", "success");
    });
  }

  // ---------- Any other form (profile request, listing form) ----------
  function initOtherForms() {
    $$('form[method="post"]').forEach((form) => {
      form.addEventListener("submit", (event) => {
        if (event.defaultPrevented) return; // already handled above
        event.preventDefault();
        showMessage(form, "Saved. In the final version this will be sent to the server.", "success");
      });
    });
  }

  // ---------- Start ----------
  // Page-specific handlers are registered before the generic form handler
  initCommon();
  initBrowse();
  initMySkills();
  initRequests();
  initSchedule();
  initOtherForms();
})();
// Skills Exchange scripts
