import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Boxes,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  Flame,
  Github,
  Globe2,
  Layers,
  Sparkles,
  Star,
  TimerReset,
  WandSparkles,
} from "lucide-react";

const projects = [
  {
    name: "Bibliografi",
    href: "https://leonidbresjnev.github.io/bibliografi/",
    icon: BookOpen,
    blurb: "A curated project focused on references and structure.",
    tags: ["Knowledge", "Structure"],
  },
  {
    name: "Rubik Cube Solver",
    href: "https://leonidbresjnev.github.io/rubiks-cube/",
    icon: Boxes,
    blurb: "Interactive cube solving visuals and algorithmic twists.",
    tags: ["Visualization", "Algorithms"],
  },
  {
    name: "Fun with WASM",
    href: "https://leonidbresjnev.github.io/funwithwasm/",
    icon: Cpu,
    blurb: "Browser experiments powered by WebAssembly modules.",
    tags: ["WASM", "Performance"],
  },
];

const highlights = [
  { label: "Projects", value: "03", icon: Layers },
  { label: "Live with Pages", value: "100%", icon: Globe2 },
  { label: "Crafted for Speed", value: "Vite", icon: TimerReset },
];

function App() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-10">
        <header className="animate-appear rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-200/10 px-3 py-1 text-xs tracking-wide text-emerald-200">
              <BadgeCheck size={14} />
              Live portfolio links
            </div>
            <a
              href="https://github.com/leonidbresjnev"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-sm text-slate-100 transition hover:border-sky-300/60 hover:bg-sky-400/10"
            >
              <Github size={16} />
              GitHub
              <ExternalLink size={14} />
            </a>
          </div>

          <h1 className="font-display text-4xl leading-tight text-white sm:text-6xl">
            Jacob Simonsen
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Playful, fast, and vibrant web experiments. This landing page is rebuilt with Vite,
            Tailwind CSS, and Lucide for a crisp, animated directory of GitHub Pages projects.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {highlights.map(({ label, value, icon: Icon }, index) => (
              <div
                key={label}
                className="animate-appear rounded-2xl border border-white/15 bg-slate-900/55 p-4"
                style={{ animationDelay: `${index * 110}ms` }}
              >
                <div className="mb-2 inline-flex rounded-lg bg-white/10 p-2">
                  <Icon size={16} className="text-amber-200" />
                </div>
                <div className="font-display text-2xl text-white">{value}</div>
                <div className="text-sm text-slate-300">{label}</div>
              </div>
            ))}
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3">
          {projects.map(({ name, href, icon: Icon, blurb, tags }, index) => (
            <article
              key={name}
              className="group animate-appear relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-5 shadow-glow backdrop-blur-xl transition hover:-translate-y-1 hover:border-sky-300/40"
              style={{ animationDelay: `${130 + index * 120}ms` }}
            >
              <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/8 p-2 text-sky-200 transition group-hover:animate-floaty">
                <Sparkles size={14} />
              </div>

              <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-black/20 p-3 text-amber-200">
                <Icon size={19} />
              </div>

              <h2 className="font-display text-2xl text-white">{name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">{blurb}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs uppercase tracking-wide text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={href}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:border-emerald-300/60 hover:bg-emerald-300/15"
              >
                Open project
                <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </section>

        <footer className="mt-6 animate-appear rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-slate-300 backdrop-blur-lg sm:mt-8 sm:text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <Compass size={14} className="text-cyan-200" />
              Built with Vite + npm
            </span>
            <span className="inline-flex items-center gap-1.5">
              <WandSparkles size={14} className="text-amber-200" />
              Styled with Tailwind
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Code2 size={14} className="text-emerald-200" />
              Icons by Lucide
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Flame size={14} className="text-orange-200" />
              Deployed via GitHub Pages
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star size={14} className="text-fuchsia-200" />
              Jacob Simonsen
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
