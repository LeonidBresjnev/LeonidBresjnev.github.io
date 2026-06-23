import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

const projects = [
  [
    "Bibliografi",
    "https://leonidbresjnev.github.io/bibliografi/",
    "https://github.com/LeonidBresjnev/bibliografi",
  ],
  [
    "Rubik Cube Solver",
    "https://leonidbresjnev.github.io/rubiks-cube/",
    "https://github.com/LeonidBresjnev/rubiks-cube",
  ],
  [
    "Bayesian information borrowing",
    "https://leonidbresjnev.github.io/funwithwasm/",
    "https://github.com/LeonidBresjnev/funwithwasm",
  ],
  [
    "Fun with OpenFDA",
    "https://leonidbresjnev.github.io/funwithopenfda/",
    "https://github.com/LeonidBresjnev/funwithopenfda",
  ],
  [
    "Crossplatform Capstone Project",
    "https://leonidbresjnev.github.io/CrossplatformCapstoneProject/",
    "https://github.com/LeonidBresjnev/CrossplatformCapstoneProject",
  ],
  [
    "myMediaPlayer",
    "https://appetize.io/app/q5df44magq2chezpiwg63nu7i4",
    "https://github.com/LeonidBresjnev/myMediaPlayer",
  ],
  [
    "filterexplorer",
    null,
    "https://github.com/LeonidBresjnev/filterexplorer.git",
  ],
];

const getStackBadgeLogoSignatures = (label) =>
  screen.getAllByText(label).map((badgeText) => {
    const badge = badgeText.closest("span");

    if (!badge) {
      throw new Error(`Missing stack badge for ${label}`);
    }

    const logos = [...badge.querySelectorAll("[data-logo]")];

    if (logos.length === 0) {
      throw new Error(`Missing stack logo for ${label}`);
    }

    return logos.map((logo) => `${logo.getAttribute("data-logo")}:${logo.getAttribute("class")}`);
  });

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the personal landing page identity", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Jacob Simonsen" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A landing page for my GitHub projects and published GitHub Pages sites."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/leonidbresjnev",
    );
  });

  it("renders GitHub Pages project cards in the intended order", () => {
    render(<App />);

    expect(screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent))
      .toEqual(projects.map(([name]) => name));

    const projectsWithPages = projects.filter(([, pageHref]) => pageHref);
    expect(screen.getAllByRole("link", { name: /open page/i })).toHaveLength(projectsWithPages.length);
    screen.getAllByRole("link", { name: /open page/i }).forEach((link, index) => {
      expect(link).toHaveAttribute("href", projectsWithPages[index][1]);
    });
    const projectsWithRepos = projects.filter(([, , repoHref]) => repoHref);
    expect(screen.getAllByRole("link", { name: /open project/i })).toHaveLength(
      projectsWithRepos.length,
    );
    screen.getAllByRole("link", { name: /open project/i }).forEach((link, index) => {
      expect(link).toHaveAttribute("href", projectsWithRepos[index][2]);
    });

    expect(screen.getByText("A visual interface to OpenFDA with text-context search using OpenAI."))
      .toBeInTheDocument();
    expect(screen.getByText("Tutorial project building a restaurant mobile app with a cross-platform stack."))
      .toBeInTheDocument();
    expect(
      screen.getByText(
        "Android media player project with native and Kotlin UI layers, using digital signal processing to control the equalizer.",
      ),
    ).toBeInTheDocument();
  });

  it("shows stack badges sourced from the project repositories", () => {
    render(<App />);

    expect(screen.queryByText("Stack")).not.toBeInTheDocument();
    expect(screen.getByLabelText("BibTeX")).toBeInTheDocument();
    expect(screen.queryByText("\\BibTex")).not.toBeInTheDocument();
    expect(screen.getAllByText("JavaScript/React")).toHaveLength(2);
    expect(screen.getByText("Expo")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.queryByText("Vite")).not.toBeInTheDocument();
    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(screen.queryByText("Three.js")).not.toBeInTheDocument();
    expect(screen.queryByText("Fun with WASM")).not.toBeInTheDocument();
    expect(screen.getByText("Bayesian modelling")).toBeInTheDocument();
    expect(screen.getAllByText("Kotlin/WASM")).toHaveLength(2);
    expect(screen.getByText("Kotlin/Ktor")).toBeInTheDocument();
    expect(screen.getAllByText("Jetpack Compose")).toHaveLength(4);
    expect(screen.getByText("C++")).toBeInTheDocument();
    expect(screen.getAllByText("Kotlin")).toHaveLength(2);
    expect(screen.getByText("Android")).toBeInTheDocument();
    expect(screen.getByText("Android Auto")).toBeInTheDocument();
    expect(screen.getAllByText("Signal processing")).toHaveLength(2);
  });

  it("does not render the old card tag chips", () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll(".uppercase.tracking-wide")).toHaveLength(0);
  });

  it("keeps card icons purposeful and removes decorative sparkles", () => {
    const { container } = render(<App />);

    expect(container.querySelector(".lucide-sparkles")).not.toBeInTheDocument();
    expect(container.querySelector(".lucide-monitor-play")).not.toBeInTheDocument();
    expect(container.querySelector(".lucide-cpu")).not.toBeInTheDocument();
    expect(container.querySelector(".lucide-chart-spline")).toBeInTheDocument();
    expect(container.querySelector(".lucide-headphones")).toBeInTheDocument();
    expect(container.querySelector(".lucide-smartphone")).toBeInTheDocument();
  });

  it("keeps visible UI styling Tailwind-first and icon actions Lucide-first", () => {
    const { container } = render(<App />);

    expect(container.querySelector("[style]")).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass("relative", "overflow-hidden");
    expect(container.querySelector("main")).toHaveClass("mx-auto", "flex", "min-h-screen");
    expect(container.querySelector("header")).toHaveClass("animate-appear", "bg-white", "shadow-glow");
    expect(container.querySelector(".lucide-badge-check")).toBeInTheDocument();

    for (const card of container.querySelectorAll("article")) {
      expect(card).toHaveClass("group", "animate-appear", "border", "bg-white");
      expect(card.querySelector("svg.lucide")).toBeInTheDocument();
    }

    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveClass("inline-flex");
      expect(link.querySelector("svg.lucide")).toBeInTheDocument();
    }
  });

  it("renders stack logos for the named technologies", () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll('[data-logo="bibtex"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-logo="javascript"]')).toHaveLength(3);
    expect(container.querySelectorAll('[data-logo="react"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-logo="expo"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-logo="bayes"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-logo="cplusplus"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-logo="kotlin"]')).toHaveLength(5);
    expect(container.querySelectorAll('[data-logo="ktor"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-logo="compose"]')).toHaveLength(4);
    expect(container.querySelectorAll('[data-logo="android"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-logo="android-auto"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-logo="signal-processing"]')).toHaveLength(2);
    expect(container.querySelector('[data-logo="bayes"]')).toHaveAttribute(
      "src",
      "./logos/bayes.png",
    );
    expect(container.querySelector('[data-logo="cplusplus"]')).toHaveAttribute(
      "src",
      "./logos/cplusplus.svg",
    );
    expect(container.querySelector('[data-logo="kotlin"]')).toHaveAttribute(
      "src",
      "./logos/kotlin.svg",
    );
    expect(container.querySelector('[data-logo="ktor"]')).toHaveAttribute(
      "src",
      "./logos/ktor.svg",
    );
    expect(container.querySelector('[data-logo="compose"]')).toHaveAttribute(
      "src",
      "./logos/jetpack-compose.png",
    );
    expect(container.querySelector('[data-logo="android-auto"]')).toHaveAttribute(
      "src",
      "./logos/android-auto.svg",
    );
  });

  it("uses consistent logos for repeated stack badges", () => {
    render(<App />);

    const repeatedStacks = [
      ["JavaScript/React", 2],
      ["Kotlin/WASM", 2],
      ["Kotlin", 2],
      ["Jetpack Compose", 4],
      ["Signal processing", 2],
    ];

    for (const [label, expectedCount] of repeatedStacks) {
      const renderedLogoSignatures = getStackBadgeLogoSignatures(label);

      expect(renderedLogoSignatures).toHaveLength(expectedCount);
      expect(new Set(renderedLogoSignatures.map((signature) => signature.join("|"))).size).toBe(1);
    }
  });

  it("keeps implementation details and wiki references out of the rendered page", () => {
    const { container } = render(<App />);

    expect(container).not.toHaveTextContent(/Built with Vite/i);
    expect(container).not.toHaveTextContent(/Vite/i);
    expect(container).not.toHaveTextContent(/Styled with Tailwind/i);
    expect(container).not.toHaveTextContent(/Icons by Lucide/i);
    expect(container).not.toHaveTextContent(/Crafted for Speed/i);
    expect(container).not.toHaveTextContent(/wiki/i);
  });
});
