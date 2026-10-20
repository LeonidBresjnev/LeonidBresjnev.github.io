import React from "react";
import { LandingHeader } from "./components/LandingHeader";
import { ProjectCard } from "./components/ProjectCard";
import { projects } from "./projects";

const projectDelayClasses = [
  "[animation-delay:130ms]",
  "[animation-delay:250ms]",
  "[animation-delay:370ms]",
  "[animation-delay:490ms]",
  "[animation-delay:610ms]",
  "[animation-delay:730ms]",
  "[animation-delay:850ms]",
  "[animation-delay:970ms]",
];

function App() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-16 top-8 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-10">
        <LandingHeader />

        <section className="mt-7 sm:mt-9">
          <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
            <h2 className="font-display text-2xl text-slate-100 sm:text-3xl">Projects</h2>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs tracking-wide text-slate-200">
              Selected work
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                delayClass={projectDelayClasses[index]}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
