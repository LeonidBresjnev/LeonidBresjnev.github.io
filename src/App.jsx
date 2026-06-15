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
];

function App() {
  return (
    <div className="relative overflow-hidden">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-10">
        <LandingHeader />

        <section className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              delayClass={projectDelayClasses[index]}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
