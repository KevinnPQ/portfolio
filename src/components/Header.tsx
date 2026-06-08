import { useState } from "react";

const navItems = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" }
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f1e]/70 backdrop-blur">
      <div className="mx-auto flex w-[min(100%-40px,1120px)] items-center justify-between gap-3 py-4">
        <a href="/" className="inline-flex items-center gap-2 font-bold tracking-tight">
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
  );
}
