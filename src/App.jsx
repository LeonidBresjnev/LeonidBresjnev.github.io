import React from "react";
import {
  ArrowUpRight,
  AudioLines,
  BadgeCheck,
  BookOpen,
  Boxes,
  ChartSpline,
  Database,
  ExternalLink,
  Github,
  Globe2,
  Headphones,
  Layers,
  Smartphone,
} from "lucide-react";

const projects = [
  {
    name: "Bibliografi",
    href: "https://leonidbresjnev.github.io/bibliografi/",
    repoHref: "https://github.com/LeonidBresjnev/bibliografi",
    icon: BookOpen,
    blurb: "A curated project focused on references and structure.",
    frameworks: [
      { name: "BibTeX", logos: ["bibtex"], mark: "bibtex" },
      { name: "JavaScript/React", logos: ["javascript", "react"] },
    ],
  },
  {
    name: "Rubik Cube Solver",
    href: "https://leonidbresjnev.github.io/rubiks-cube/",
    repoHref: "https://github.com/LeonidBresjnev/rubiks-cube",
    icon: Boxes,
    blurb: "Interactive cube solving visuals and algorithmic twists.",
    frameworks: [{ name: "JavaScript/React", logos: ["javascript", "react"] }],
  },
  {
    name: "Bayesian information borrowing",
    href: "https://leonidbresjnev.github.io/funwithwasm/",
    repoHref: "https://github.com/LeonidBresjnev/funwithwasm",
    icon: ChartSpline,
    blurb: "Browser experiments powered by WebAssembly modules.",
    frameworks: [
      { name: "Bayesian modelling", logos: ["bayes"] },
      { name: "Kotlin/WASM", logos: ["kotlin"] },
      { name: "Jetpack Compose", logos: ["compose"] },
    ],
  },
  {
    name: "Fun with OpenFDA",
    href: "https://leonidbresjnev.github.io/funwithopenfda/",
    repoHref: "https://github.com/LeonidBresjnev/visualopenfda",
    icon: Database,
    blurb: "A visual interface to OpenFDA with text-context search using OpenAI.",
    frameworks: [
      { name: "Kotlin/WASM", logos: ["kotlin"] },
      { name: "Kotlin/Ktor", logos: ["kotlin", "ktor"] },
      { name: "Jetpack Compose", logos: ["compose"] },
    ],
  },
  {
    name: "Crossplatform Capstone Project",
    href: "https://leonidbresjnev.github.io/CrossplatformCapstoneProject/",
    repoHref: "https://github.com/LeonidBresjnev/CrossplatformCapstoneProject",
    icon: Smartphone,
    blurb: "Tutorial project building a restaurant mobile app with a cross-platform stack.",
    frameworks: [
      { name: "Expo", logos: ["expo"] },
      { name: "JavaScript", logos: ["javascript"] },
    ],
  },
  {
    name: "myMediaPlayer",
    repoHref: "https://github.com/LeonidBresjnev/myMediaPlayer",
    icon: Headphones,
    blurb:
      "Android media player project with native and Kotlin UI layers, using digital signal processing to control the equalizer.",
    frameworks: [
      { name: "C++", logos: ["cplusplus"] },
      { name: "Kotlin", logos: ["kotlin"] },
      { name: "Jetpack Compose", logos: ["compose"] },
      { name: "Android", logos: ["android"] },
      { name: "Android Auto", logos: ["android-auto"] },
      { name: "Signal processing", logos: ["signal-processing"] },
    ],
  },
  {
    name: "filterexplorer",
    repoHref: "https://github.com/LeonidBresjnev/filterexplorer.git",
    icon: ChartSpline,
    blurb: "Exploration and comparison of signal-processing filter types.",
    frameworks: [
      { name: "Kotlin", logos: ["kotlin"] },
      { name: "Jetpack Compose", logos: ["compose"] },
      { name: "Signal processing", logos: ["signal-processing"] },
    ],
  },
];

const highlights = [
  { label: "Projects", value: "07", icon: Layers },
  { label: "Pages sites", value: "05", icon: Globe2 },
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
  "[animation-delay:610ms]",
  "[animation-delay:730ms]",
  "[animation-delay:850ms]",
];

const stackBadgeClass =
  "border-slate-200 bg-white text-slate-900 shadow-sm shadow-slate-200/60";

// Brand path data is from Simple Icons (CC0). BibTeX has no Simple Icons logo.
const stackLogos = {
  bibtex: {
    label: "BibTeX",
    className: "text-[#3d6117]",
    icon: BookOpen,
  },
  javascript: {
    label: "JavaScript",
    className: "text-[#f7df1e]",
    path: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z",
  },
  react: {
    label: "React",
    className: "text-[#61dafb]",
    path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
  },
  expo: {
    label: "Expo",
    className: "text-slate-950",
    path: "M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.303.567.49-.505 5.794-9.776 8.35-13.29a.761.761 0 011.248 0c2.556 3.514 7.86 12.785 8.35 13.29.727.748 1.723.282 2.303-.567.57-.835.728-1.42.728-2.046 0-.426-8.26-15.798-9.092-17.078-.8-1.23-1.044-1.498-2.397-1.542h-1.032c-1.353.044-1.597.311-2.398 1.542C8.267 3.991.33 18.758 0 19.77Z",
  },
  cplusplus: {
    label: "C++",
    src: "./logos/cplusplus.svg",
  },
  android: {
    label: "Android",
    className: "text-[#3ddc84]",
    path: "M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z",
  },
  "android-auto": {
    label: "Android Auto",
    src: "./logos/android-auto.svg",
  },
  bayes: {
    label: "Bayesian modelling",
    src: "./logos/bayes.png",
  },
  kotlin: {
    label: "Kotlin",
    src: "./logos/kotlin.svg",
  },
  ktor: {
    label: "Ktor",
    src: "./logos/ktor.svg",
  },
  compose: {
    label: "Jetpack Compose",
    src: "./logos/jetpack-compose.png",
  },
  "signal-processing": {
    label: "Signal processing",
    className: "text-cyan-700",
    icon: AudioLines,
  },
};

function StackLogo({ logo }) {
  const logoConfig = stackLogos[logo];

  if (logoConfig.icon) {
    const Icon = logoConfig.icon;

    return (
      <Icon
        size={15}
        className={logoConfig.className}
        aria-hidden="true"
        data-logo={logo}
      />
    );
  }

  if (logoConfig.src) {
    return (
      <img
        src={logoConfig.src}
        alt=""
        className="h-4 w-4 object-contain"
        aria-hidden="true"
        data-logo={logo}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 fill-current ${logoConfig.className}`}
      aria-hidden="true"
      data-logo={logo}
    >
      <path d={logoConfig.path} />
    </svg>
  );
}

function StackLabel({ name, mark }) {
  if (mark !== "bibtex") {
    return name;
  }

  return (
    <span
      aria-label={name}
      className="inline-flex items-baseline font-serif text-[1.05em] tracking-normal"
    >
      <span aria-hidden="true">B</span>
      <span aria-hidden="true" className="text-[0.78em] uppercase">
        ib
      </span>
      <span aria-hidden="true" className="-ml-px">
        T
      </span>
      <span aria-hidden="true" className="relative top-[0.18em] -ml-px">
        E
      </span>
      <span aria-hidden="true" className="-ml-px">
        X
      </span>
    </span>
  );
}

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

        <section className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ name, href, repoHref, icon: Icon, blurb, frameworks }, index) => (
            <article
              key={name}
              className={`group animate-appear relative overflow-hidden rounded-3xl border border-sky-200 bg-white p-5 shadow-glow transition hover:-translate-y-1 hover:border-sky-400 ${projectDelayClasses[index]}`}
            >
              <div className="flex items-start gap-3">
                <div className="inline-flex shrink-0 rounded-xl border border-sky-100 bg-sky-50 p-3 text-sky-700">
                  <Icon size={19} />
                </div>
                <h2 className="font-display text-2xl text-slate-950">{name}</h2>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">{blurb}</p>

              <div className="mt-5 border-t border-sky-100 pt-4">
                <div className="flex flex-wrap gap-2">
                  {frameworks.map(({ name: frameworkName, logos, mark }) => (
                    <span
                      key={frameworkName}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${stackBadgeClass}`}
                    >
                      <span className="inline-flex items-center gap-1" aria-hidden="true">
                        {logos.map((logo) => (
                          <StackLogo key={logo} logo={logo} />
                        ))}
                      </span>
                      <StackLabel name={frameworkName} mark={mark} />
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                {href ? (
                  <a
                    href={href}
                    className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-sky-100 px-2.5 py-2 text-sm font-medium text-slate-900 transition hover:border-sky-400 hover:bg-sky-200"
                  >
                    Open page
                    <ArrowUpRight size={15} className="shrink-0" />
                  </a>
                ) : null}
                <a
                  href={repoHref}
                  className={`inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 ${href ? "" : "col-span-2"}`}
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
