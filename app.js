import { projects } from "./projects.js";

const els = {
  projectsGrid: document.getElementById("projectsGrid"),
  modal: document.getElementById("projectModal"),
  modalClose: document.getElementById("modalClose"),
  modalEyebrow: document.getElementById("modalEyebrow"),
  modalTitle: document.getElementById("modalTitle"),
  modalMeta: document.getElementById("modalMeta"),
  modalCover: document.getElementById("modalCover"),
  modalSections: document.getElementById("modalSections"),
  year: document.getElementById("year"),
  navToggle: document.getElementById("navToggle"),
  mobileNav: document.getElementById("mobileNav"),
  contactForm: document.getElementById("contactForm"),
  formNote: document.getElementById("formNote")
};

let lastFocused = null;

function init() {
  els.year.textContent = String(new Date().getFullYear());
  renderProjects();
  wireModal();
  wireMobileNav();
  wireContactForm();
}

function renderProjects() {
  if (!els.projectsGrid) return;

  const cards = projects.map((p) => projectCardHtml(p)).join("");
  els.projectsGrid.innerHTML = cards;

  els.projectsGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open-project]");
    if (!btn) return;

    const id = btn.getAttribute("data-open-project");
    const project = projects.find((x) => x.id === id);
    if (!project) return;

    openProject(project, btn);
  });
}

function projectCardHtml(p) {
  const chips = (p.technologies || []).slice(0, 4).map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("");
  return `
    <article class="project-card">
      <div class="project-cover" aria-hidden="true"></div>
      <div class="project-body">
        <h3 class="project-title">${escapeHtml(p.title)}</h3>
        <p class="project-desc">${escapeHtml(p.shortDescription)}</p>
        <div class="chip-row" aria-label="Technologies">
          ${chips}
        </div>
      </div>
      <div class="project-footer">
        <button class="button button-ghost" type="button" data-open-project="${escapeHtmlAttr(p.id)}">
          View details
        </button>
        <span class="text-link" aria-hidden="true">Details</span>
      </div>
    </article>
  `.trim();
}

function openProject(p, focusedEl) {
  lastFocused = focusedEl ?? document.activeElement;

  els.modalEyebrow.textContent = p.eyebrow || "Project";
  els.modalTitle.textContent = p.title || "Project details";
  renderMeta(p);

  els.modalCover.style.background = p.coverGradient || "";

  renderSections(p);

  if (typeof els.modal.showModal === "function") {
    els.modal.showModal();
  } else {
    // Fallback: open attribute for older browsers
    els.modal.setAttribute("open", "");
  }

  // Focus close button for accessibility
  els.modalClose.focus();
}

function wireModal() {
  if (!els.modal) return;

  els.modalClose.addEventListener("click", () => closeModal());
  els.modal.addEventListener("click", (e) => {
    // Close if clicking backdrop (dialog itself, not inner content)
    if (e.target === els.modal) closeModal();
  });

  // ESC closes dialog automatically for <dialog>, but we still restore focus.
  els.modal.addEventListener("close", () => {
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    lastFocused = null;
  });
}

function closeModal() {
  if (!els.modal) return;
  if (typeof els.modal.close === "function") els.modal.close();
  else els.modal.removeAttribute("open");
}

function renderMeta(p) {
  const meta = [];
  if (p.technologies?.length) meta.push(...p.technologies.map((t) => ({ label: t })));
  if (p.meta?.dataset) meta.push({ label: `Dataset: ${p.meta.dataset}` });
  if (p.meta?.period) meta.push({ label: `Periodo: ${p.meta.period}` });
  if (p.meta?.source) meta.push({ label: `Fuente: ${p.meta.source}` });

  els.modalMeta.innerHTML = meta.map((m) => `<span class="chip">${escapeHtml(m.label)}</span>`).join("");
}

function renderSections(p) {
  if (!els.modalSections) return;

  if (p.article?.sections?.length) {
    els.modalSections.innerHTML = p.article.sections.map((s) => sectionHtml(s)).join("");
    return;
  }

  const blocks = [];
  blocks.push(sectionHtml({ title: "Overview", kind: "text", text: p.overview || "" }));
  blocks.push(
    `<div class="modal-split">
      ${sectionHtml({ title: "Approach", kind: "list", items: p.approach || [] })}
      ${sectionHtml({ title: "Results", kind: "list", items: p.results || [] })}
    </div>`
  );
  blocks.push(sectionHtml({ title: "Charts", kind: "charts", charts: p.charts || [] }));
  blocks.push(sectionHtml({ title: "Technologies", kind: "chips", chips: p.technologies || [] }));
  blocks.push(sectionHtml({ title: "Links", kind: "links", links: p.links || {} }));
  els.modalSections.innerHTML = blocks.join("");
}

function sectionHtml(section) {
  const title = section.title ? `<h4 class="modal-section-title">${escapeHtml(section.title)}</h4>` : "";

  if (section.kind === "text") {
    return `<section class="modal-section">${title}<p class="body">${escapeHtml(section.text || "")}</p></section>`;
  }

  if (section.kind === "list") {
    const items = (section.items || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");
    return `<section class="modal-section">${title}<ul class="bullet-list">${items}</ul></section>`;
  }

  if (section.kind === "charts") {
    return `<section class="modal-section">${title}<div class="charts">${renderChartsHtml(
      section.charts || []
    )}</div></section>`;
  }

  if (section.kind === "chips") {
    const chips = (section.chips || []).map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("");
    return `<section class="modal-section">${title}<div class="chip-row">${chips}</div></section>`;
  }

  if (section.kind === "links") {
    return `<section class="modal-section">${title}${renderLinksHtml(section.links || {})}</section>`;
  }

  if (section.kind === "table") {
    return `<section class="modal-section">${title}${tableHtml(section)}</section>`;
  }

  return `<section class="modal-section">${title}<p class="body">${escapeHtml(section.text || "")}</p></section>`;
}

function tableHtml(section) {
  const cols = section.columns || [];
  const rows = section.rows || [];
  const thead = `<thead><tr>${cols.map((c) => `<th>${escapeHtml(c)}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${rows
    .map((r) => `<tr>${cols.map((c) => `<td>${escapeHtml(r[c] ?? "")}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;
  return `<table class="table">${thead}${tbody}</table>`;
}

function renderChartsHtml(charts) {
  if (!charts.length) return `<p class="body">Add chart screenshots (PNG/SVG) or embed charts here.</p>`;

  return (
    charts
      .map((c) => {
        const caption = c.caption ? `<figcaption>${escapeHtml(c.caption)}</figcaption>` : "";
        if (c.type === "image" && c.src) {
          return `<figure class="chart"><img src="${escapeHtmlAttr(c.src)}" alt="${escapeHtmlAttr(
            c.alt || c.caption || "Chart"
          )}" />${caption}</figure>`;
        }
        if (c.type === "svg" && c.svg) {
          return `<figure class="chart">${c.svg}${caption}</figure>`;
        }
        if (c.type === "html" && c.src) {
          return `<figure class="chart"><iframe src="${escapeHtmlAttr(
            c.src
          )}" title="${escapeHtmlAttr(c.title || c.caption || "Interactive chart")}" loading="lazy"></iframe>${caption}</figure>`;
        }
        return "";
      })
      .join("") || `<p class="body">No charts available.</p>`
  );
}

function renderLinksHtml(links) {
  const items = [];
  if (links.live) items.push({ label: "Live", href: links.live });
  if (links.report) items.push({ label: "Report", href: links.report });
  if (links.github) items.push({ label: "GitHub", href: links.github });

  if (!items.length) {
    return `<p class="body">Add links (GitHub, report PDF, live dashboard) in <code>projects.js</code>.</p>`;
  }

  return `<div class="link-row">${items
    .map(
      (x) =>
        `<a class="button button-ghost" href="${escapeHtmlAttr(x.href)}" target="_blank" rel="noopener">${escapeHtml(
          x.label
        )}</a>`
    )
    .join("")}</div>`;
}

function wireMobileNav() {
  if (!els.navToggle || !els.mobileNav) return;

  els.navToggle.addEventListener("click", () => {
    const open = !els.mobileNav.hidden;
    els.mobileNav.hidden = open;
    els.navToggle.setAttribute("aria-expanded", String(!open));
    els.navToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
  });

  els.mobileNav.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^=\"#\"]");
    if (!a) return;
    els.mobileNav.hidden = true;
    els.navToggle.setAttribute("aria-expanded", "false");
    els.navToggle.setAttribute("aria-label", "Open menu");
  });
}

function wireContactForm() {
  if (!els.contactForm) return;

  els.contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(els.contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) return;

    const subject = encodeURIComponent("Portfolio inquiry from " + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
    els.formNote.textContent = "Opening your email client...";
  });
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeHtmlAttr(s) {
  return escapeHtml(s).replaceAll("`", "&#96;");
}

init();

