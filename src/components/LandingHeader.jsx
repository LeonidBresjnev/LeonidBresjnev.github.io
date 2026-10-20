import React from "react";
import {
  BadgeCheck,
  ExternalLink,
  Globe2,
  Layers,
} from "lucide-react";
import { projects } from "../projects";

function GitHubLogo({ size = 16, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297a12 12 0 0 0-3.794 23.385c.6.111.82-.258.82-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.833 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.932 0-1.311.469-2.381 1.236-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.49 11.49 0 0 1 6.007 0c2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.241 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.814 1.103.814 2.222v3.293c0 .322.218.694.825.576A12.004 12.004 0 0 0 12 .297" />
    </svg>
  );
}

const highlightDelayClasses = [
  "[animation-delay:0ms]",
  "[animation-delay:110ms]",
];

export function LandingHeader() {
  const projectCount = projects.length;
  const pageSitesCount = projects.filter((project) => Boolean(project.href)).length;

  const highlights = [
    { label: "Projects", value: String(projectCount).padStart(2, "0"), icon: Layers },
    {
      label: "Pages sites",
      value: String(pageSitesCount).padStart(2, "0"),
      icon: Globe2,
    },
  ];

  return (
    <header className="animate-appear rounded-3xl border border-white/15 bg-white/10 p-5 shadow-glow backdrop-blur-md sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-400/15 px-3 py-1 text-xs tracking-wide text-emerald-100">
          <BadgeCheck size={14} />
          Live portfolio links
        </div>
        <a
          href="https://github.com/leonidbresjnev"
          className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-300/20 px-4 py-2 text-sm text-cyan-50 transition hover:border-cyan-100/50 hover:bg-cyan-300/30"
        >
          <GitHubLogo size={16} />
          GitHub
          <ExternalLink size={14} />
        </a>
      </div>

      <h1 className="font-display text-4xl leading-tight text-white sm:text-6xl">
        Jacob Simonsen
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
        A landing page for my GitHub projects and published GitHub Pages sites.
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {highlights.map(({ label, value, icon: Icon }, index) => (
          <div
            key={label}
            className={`animate-appear rounded-2xl border border-white/15 bg-white/10 p-4 ${highlightDelayClasses[index]}`}
          >
            <div className="mb-2 inline-flex rounded-lg border border-white/15 bg-slate-900/40 p-2">
              <Icon size={16} className="text-cyan-200" />
            </div>
            <div className="font-display text-2xl text-white">{value}</div>
            <div className="text-sm text-slate-300">{label}</div>
          </div>
        ))}
      </div>
    </header>
  );
}
