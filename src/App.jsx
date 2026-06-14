import React from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Boxes,
  Circle,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Globe2,
  Layers,
  Sparkles,
} from "lucide-react";

const projects = [
  {
    name: "Bibliografi",
    href: "https://leonidbresjnev.github.io/bibliografi/",
    repoHref: "https://github.com/LeonidBresjnev/bibliografi",
    icon: BookOpen,
    blurb: "A curated project focused on references and structure.",
    frameworks: [
      { name: "BibTeX", tone: "bibtex" },
      { name: "JavaScript/React", tone: "javascriptReact" },
    ],
    tags: ["Knowledge", "Structure"],
  },
  {
    name: "Rubik Cube Solver",
    href: "https://leonidbresjnev.github.io/rubiks-cube/",
    repoHref: "https://github.com/LeonidBresjnev/rubiks-cube",
    icon: Boxes,
    blurb: "Interactive cube solving visuals and algorithmic twists.",
    frameworks: [{ name: "JavaScript/React", tone: "javascriptReact" }],
    tags: ["Visualization", "Algorithms"],
  },
  {
    name: "Fun with WASM",
    href: "https://leonidbresjnev.github.io/funwithwasm/",
    repoHref: "https://github.com/LeonidBresjnev/funwithwasm",
    icon: Cpu,
    blurb: "Browser experiments powered by WebAssembly modules.",
    frameworks: [
      { name: "Kotlin/WASM", tone: "kotlin" },
      { name: "Jetpack Compose", tone: "compose" },
    ],
    tags: ["WASM", "Performance"],
  },
  {
    name: "Fun with OpenFDA",
    href: "https://leonidbresjnev.github.io/funwithopenfda/",
    repoHref: "https://github.com/LeonidBresjnev/visualopenfda",
    icon: Database,
    blurb: "A visual interface to OpenFDA with text-context search using OpenAI.",
    frameworks: [
      { name: "Kotlin/WASM", tone: "kotlin" },
      { name: "Kotlin/Ktor", tone: "ktor" },
      { name: "Jetpack Compose", tone: "compose" },
    ],
    tags: ["OpenFDA", "OpenAI"],
  },
];

const highlights = [
  { label: "Projects", value: "04", icon: Layers },
  { label: "Live with Pages", value: "100%", icon: Globe2 },
];

const highlightDelayClasses = [
  "[animation-delay:0ms]",
  "[animation-delay:110ms]",
];

const projectDelayClasses = [
  "[animation-delay:130ms]",
  "[animation-delay:250ms]",
  "[animation-delay:370ms]",
  "[animation-delay:490ms]",
];

const frameworkToneClasses = {
  bibtex: {
    badge: "border-[#3d6117]/35 bg-[#3d6117]/10 text-slate-900",
    dot: "text-[#3d6117]",
  },
  javascriptReact: {
    badge: "border-[#f1e05a]/55 bg-[#f1e05a]/20 text-slate-900",
    dot: "text-[#f1e05a]",
  },
  kotlin: {
    badge: "border-[#a97bff]/45 bg-[#a97bff]/15 text-slate-900",
    dot: "text-[#a97bff]",
  },
  ktor: {
    badge: "border-[#087cfa]/40 bg-[#087cfa]/10 text-slate-900",
    dot: "text-[#087cfa]",
  },
  compose: {
    badge: "border-[#3ddc84]/45 bg-[#3ddc84]/15 text-slate-900",
    dot: "text-[#3ddc84]",
  },
};

function App() {
  return (
    <div className="relative overflow-hidden">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-10">
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

        <section className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map(({ name, href, repoHref, icon: Icon, blurb, frameworks, tags }, index) => (
            <article
              key={name}
              className={`group animate-appear relative overflow-hidden rounded-3xl border border-sky-200 bg-white p-5 shadow-glow transition hover:-translate-y-1 hover:border-sky-400 ${projectDelayClasses[index]}`}
            >
              <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-sky-50 p-2 text-sky-700 transition group-hover:animate-floaty">
                <Sparkles size={14} />
              </div>

              <div className="mb-4 inline-flex rounded-xl border border-sky-100 bg-sky-50 p-3 text-sky-700">
                <Icon size={19} />
              </div>

              <h2 className="font-display text-2xl text-slate-950">{name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{blurb}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs uppercase tracking-wide text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 border-t border-sky-100 pt-4">
                <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                  <Code2 size={14} />
                  Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {frameworks.map(({ name: frameworkName, tone }) => (
                    <span
                      key={frameworkName}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${frameworkToneClasses[tone].badge}`}
                    >
                      <Circle
                        size={10}
                        className={`${frameworkToneClasses[tone].dot} fill-current stroke-0`}
                        aria-hidden="true"
                      />
                      {frameworkName}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <a
                  href={href}
                  className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-sky-100 px-2.5 py-2 text-sm font-medium text-slate-900 transition hover:border-sky-400 hover:bg-sky-200"
                >
                  Open page
                  <ArrowUpRight size={15} className="shrink-0" />
                </a>
                <a
                  href={repoHref}
                  className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Open project
                  <Github size={15} className="shrink-0" />
                </a>
              </div>
            </article>
          ))}
        </section>

      </main>
    </div>
  );
}

export default App;
