import { useMemo, useState } from "react";
import { projects } from "./data/projects";

const navItems = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" }
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [formNote, setFormNote] = useState("");

  const year = useMemo(() => new Date().getFullYear(), []);

  const openMail = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
    setFormNote("Opening your email client...");
  };

  const openProjectPage = (project) => {
    setActiveProject(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (activeProject) {
    return <ProjectPage project={activeProject} onClose={() => setActiveProject(null)} />;
  }

  return (
    <div className="min-h-screen">
      <a href="#main" className="absolute left-[-999px] top-3 rounded-xl border border-white/10 bg-white/10 px-4 py-2 focus:left-4">
        Skip to content
      </a>

      <header id="top" className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f1e]/70 backdrop-blur">
        <div className="mx-auto flex w-[min(100%-40px,1120px)] items-center justify-between gap-3 py-4">
          <a href="#top" className="inline-flex items-center gap-2 font-bold tracking-tight">
            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_0_4px_rgba(99,102,241,0.2)]" />
            <span className="text-sm">Kevinn Perez Quesada</span>
          </a>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm font-semibold text-white/70 hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#0a0f1e]/90 md:hidden">
            <div className="mx-auto grid w-[min(100%-40px,1120px)] gap-2 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white/80"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="main">
        <section className="py-16">
          <div className="mx-auto grid w-[min(100%-40px,1120px)] gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-indigo-200">
                Data Analysis • Dashboards • Storytelling
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                Navigating raw data to surface the insights that matter
              </h1>
              <p className="mt-3 max-w-2xl text-white/75">
                From cleaning noise to uncovering hidden truths, I transform stale information into actionable knowledge
                that drives real change.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Excel", "SQL", "Power BI", "Python"].map((tool) => (
                  <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/80">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl">
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["Revenue", "$128k", "+12.4%"],
                  ["Conversion", "3.8%", "+0.6%"],
                  ["Churn", "1.9%", "-0.4%"]
                ].map(([label, value, delta]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs font-bold text-white/60">{label}</p>
                    <p className="mt-1 text-lg font-extrabold">{value}</p>
                    <p className={`mt-1 text-xs font-extrabold ${delta.startsWith("+") ? "text-cyan-300" : "text-rose-300"}`}>{delta}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-14">
          <div className="mx-auto w-[min(100%-40px,1120px)]">
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="mt-2 max-w-2xl text-white/70">A few end-to-end analyses with clear results, charts, and technical details.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <article key={project.id} className="flex min-h-[280px] flex-col rounded-2xl border border-white/10 bg-white/5">
                  <div className="h-28 border-b border-white/10 bg-gradient-to-r from-indigo-500/30 to-cyan-400/20" />
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <h3 className="text-lg font-extrabold">{project.title}</h3>
                    <p className="text-sm text-white/70">{project.shortDescription}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {(project.technologies || []).slice(0, 4).map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-white/80">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="mt-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold hover:bg-white/10"
                      onClick={() => openProjectPage(project)}
                    >
                      View details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-white/10 bg-white/[0.03] py-14">
          <div className="mx-auto grid w-[min(100%-40px,1120px)] gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">About</h2>
              <p className="mt-3 text-white/75">
                I am a data analyst focused on turning raw data into decisions through rigorous analysis and clear storytelling.
              </p>
            </div>
            <aside className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="font-bold">Courses and certifications</h3>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-white/70">
                <li>Google Data Analytics</li>
                <li>SQL for Data Analysis</li>
                <li>Excel: Pivot tables and Power Query</li>
                <li>Power BI: DAX and dashboard design</li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="contact" className="py-14">
          <div className="mx-auto grid w-[min(100%-40px,1120px)] gap-5 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
              <p className="mt-2 text-white/70">Want to collaborate? Reach out and I will be happy to chat.</p>
            </div>
            <form onSubmit={openMail} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <input name="name" required placeholder="Your name" className="rounded-xl border border-white/10 bg-[#0a0f1e]/40 p-3" />
                <input name="email" type="email" required placeholder="you@example.com" className="rounded-xl border border-white/10 bg-[#0a0f1e]/40 p-3" />
              </div>
              <textarea
                name="message"
                rows="6"
                required
                placeholder="Tell me about your project..."
                className="mt-3 w-full rounded-xl border border-white/10 bg-[#0a0f1e]/40 p-3"
              />
              <button type="submit" className="mt-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 font-bold text-slate-950">
                Send message
              </button>
              <p className="mt-2 text-sm text-white/60">{formNote}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/10 py-8">
        <div className="mx-auto flex w-[min(100%-40px,1120px)] items-center justify-between gap-3 text-sm text-white/60">
          <span>© {year} Your Name</span>
          <a href="#top" className="font-semibold text-indigo-200">
            Back to top
          </a>
        </div>
      </footer>

    </div>
  );
}

function ProjectPage({ project, onClose }) {
  const [expandedChart, setExpandedChart] = useState(null);
  const meta = [
    ...(project.technologies || []),
    project.meta?.dataset ? `Dataset: ${project.meta.dataset}` : null,
    project.meta?.period ? `Period: ${project.meta.period}` : null,
    project.meta?.source ? `Source: ${project.meta.source}` : null
  ].filter(Boolean);

  const sections =
    project.article?.sections ||
    [
      { kind: "text", title: "Overview", text: project.overview || "" },
      { kind: "list", title: "Approach", items: project.approach || [] },
      { kind: "list", title: "Results", items: project.results || [] }
    ];

  return (
    <div className="min-h-screen text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f1e]/90 backdrop-blur">
        <div className="mx-auto flex w-[min(100%-40px,1120px)] items-center justify-between gap-3 py-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-300">{project.eyebrow || "Project"}</p>
            <h1 className="truncate text-lg font-bold md:text-xl">{project.title}</h1>
          </div>
          <button
            type="button"
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            onClick={onClose}
          >
            Back to portfolio
          </button>
        </div>
      </header>

      <main className="mx-auto w-[min(100%-40px,1600px)] py-10">
        <article className="mx-auto w-full max-w-[960px] p-2 md:p-4">
          <p className="text-[0.85rem] font-semibold text-indigo-300">{project.eyebrow || "Case study"}</p>
          <h2 className="mt-2 text-[2.5rem] font-extrabold leading-tight tracking-tight">{project.title}</h2>
          <p className="mt-3 text-[1.4rem] leading-[1.6] text-white/75">
            {project.shortDescription || "Project summary goes here."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-y border-white/10 py-4">
            {meta.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.85rem] font-semibold text-white/80">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 space-y-8">
            {sections.map((section, index) => (
              <section key={`${section.title || section.kind}-${index}`} className={index > 0 ? "border-t border-white/10 pt-8" : ""}>
                {section.title && <h3 className="mb-4 text-2xl font-bold tracking-tight">{section.title}</h3>}
                <SectionBody section={section} onExpandChart={setExpandedChart} />
              </section>
            ))}
          </div>
        </article>
      </main>

      {expandedChart && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setExpandedChart(null)}
        >
          <div
            className="auto-hide-scrollbar relative max-h-[90vh] w-full max-w-[1400px] overflow-y-auto rounded-2xl border border-white/15 bg-[#0a0f1e] p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="mb-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10"
              onClick={() => setExpandedChart(null)}
            >
              Close chart
            </button>
            {expandedChart.type === "svg" && expandedChart.svg ? (
              <div className="overflow-hidden rounded-lg" dangerouslySetInnerHTML={{ __html: expandedChart.svg }} />
            ) : expandedChart.type === "image" && expandedChart.src ? (
              <img src={expandedChart.src} alt={expandedChart.alt || expandedChart.caption || "Chart"} className="w-full rounded-lg" />
            ) : expandedChart.type === "html" && expandedChart.src ? (
              <iframe
                src={expandedChart.src}
                title={expandedChart.title || expandedChart.caption || "Interactive chart"}
                className="auto-hide-scrollbar h-[80vh] w-full rounded-lg border border-white/10 bg-white"
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionBody({ section, onExpandChart }) {
  if (section.kind === "list") {
    return (
      <ul className="list-disc space-y-2 pl-5 text-[1.4rem] leading-[1.6] text-white/75">
        {(section.items || []).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (section.kind === "table") {
    const cols = section.columns || [];
    const rows = section.rows || [];
    return <DataTable columns={cols} rows={rows} />;
  }

  if (section.kind === "links") {
    const links = section.links || {};
    const items = [
      links.live ? { label: "Live", href: links.live } : null,
      links.report ? { label: "Report", href: links.report } : null,
      links.github ? { label: "GitHub", href: links.github } : null
    ].filter(Boolean);
    if (!items.length) {
      return <p className="text-base leading-7 text-white/70">Add project links when available.</p>;
    }
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[0.95rem] font-semibold text-white/80 hover:bg-white/10"
          >
            {item.label}
          </a>
        ))}
      </div>
    );
  }

  if (section.kind === "charts") {
    return (
      <div className="relative left-1/2 w-[95vw] -translate-x-1/2 xl:w-[75vw] 2xl:w-[72vw]">
        <div className="grid gap-4">
        {(section.charts || []).map((chart, idx) => (
          <figure key={`${chart.type}-${idx}`} className="rounded-xl border border-white/10 bg-white/5 p-3">
            {chart.type === "svg" && chart.svg ? (
              <div className="overflow-hidden rounded-lg" dangerouslySetInnerHTML={{ __html: chart.svg }} />
            ) : chart.type === "image" && chart.src ? (
              <img src={chart.src} alt={chart.alt || chart.caption || "Chart"} className="w-full rounded-lg" />
            ) : chart.type === "html" && chart.src ? (
              <iframe
                src={chart.src}
                title={chart.title || chart.caption || "Interactive chart"}
                className="auto-hide-scrollbar h-[560px] w-full rounded-lg border border-white/10 bg-white"
              />
            ) : (
              <p className="text-sm text-white/60">Chart preview placeholder</p>
            )}
            {chart.caption && <figcaption className="mt-2 text-sm text-white/60">{chart.caption}</figcaption>}
            <button
              type="button"
              className="mt-3 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
              onClick={() => onExpandChart(chart)}
            >
              Expand chart
            </button>
          </figure>
        ))}
      </div>
      </div>
    );
  }

  return <p className="text-[1.4rem] leading-[1.6] text-white/75">{section.text || "Add your project details here."}</p>;
}

function DataTable({ columns, rows }) {
  const [copied, setCopied] = useState(false);

  const copyTable = async () => {
    const header = columns.join("\t");
    const body = rows.map((row) => columns.map((column) => String(row[column] ?? "")).join("\t")).join("\n");
    await navigator.clipboard.writeText(`${header}\n${body}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1428]/90 p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50">DataFrame preview</p>
        <button
          type="button"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
          onClick={copyTable}
        >
          {copied ? "Copied" : "Copy table"}
        </button>
      </div>
      <div className="auto-hide-scrollbar overflow-x-auto rounded-xl border border-white/10 bg-[#0a0f1e]/70">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white/5">
              {columns.map((col) => (
                <th key={col} className="border-b border-white/10 px-3 py-2 text-left font-semibold text-white/90">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="odd:bg-white/[0.02]">
                {columns.map((col) => (
                  <td key={`${idx}-${col}`} className="border-b border-white/10 px-3 py-2 align-top text-[1rem] text-white/75">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
