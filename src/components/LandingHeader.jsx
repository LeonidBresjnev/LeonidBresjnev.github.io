import React from "react";
import {
  BadgeCheck,
  ExternalLink,
  Github,
  Globe2,
  Layers,
} from "lucide-react";

const highlights = [
  { label: "Projects", value: "07", icon: Layers },
  { label: "Pages sites", value: "05", icon: Globe2 },
];

const highlightDelayClasses = [
  "[animation-delay:0ms]",
  "[animation-delay:110ms]",
];

export function LandingHeader() {
  return (
    <header className="animate-appear rounded-3xl border border-sky-200 bg-white p-5 shadow-glow sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs tracking-wide text-emerald-800">
          <BadgeCheck size={14} />
          Live portfolio links
        </div>
        <a
          href="https://github.com/leonidbresjnev"
          className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-100 px-4 py-2 text-sm text-slate-800 transition hover:border-sky-400 hover:bg-sky-200"
        >
          <Github size={16} />
          GitHub
          <ExternalLink size={14} />
        </a>
      </div>

      <h1 className="font-display text-4xl leading-tight text-slate-950 sm:text-6xl">
        Jacob Simonsen
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
        A landing page for my GitHub projects and published GitHub Pages sites.
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {highlights.map(({ label, value, icon: Icon }, index) => (
          <div
            key={label}
            className={`animate-appear rounded-2xl border border-sky-100 bg-sky-50 p-4 ${highlightDelayClasses[index]}`}
          >
            <div className="mb-2 inline-flex rounded-lg bg-white p-2">
              <Icon size={16} className="text-sky-700" />
            </div>
            <div className="font-display text-2xl text-slate-950">{value}</div>
            <div className="text-sm text-slate-600">{label}</div>
          </div>
        ))}
      </div>
    </header>
  );
}
