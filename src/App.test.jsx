import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";
import { projects } from "./projects";

const frameworkCounts = projects
  .flatMap(({ frameworks }) => frameworks)
  .reduce((counts, framework) => {
    counts.set(framework.name, (counts.get(framework.name) ?? 0) + 1);
    return counts;
  }, new Map());

const logoCounts = projects
  .flatMap(({ frameworks }) => frameworks.flatMap(({ logos }) => logos))
  .reduce((counts, logo) => {
    counts.set(logo, (counts.get(logo) ?? 0) + 1);
    return counts;
  }, new Map());

const getStackBadges = (container) =>
  [...container.querySelectorAll("article .flex.flex-wrap > span")];
const getStackBadgeName = (badge) =>
  badge.querySelector("[aria-label]")?.getAttribute("aria-label") ?? badge.textContent.trim();

const getStackBadgeLogoSignatures = (container, label) =>
  getStackBadges(container)
    .filter((badge) => getStackBadgeName(badge) === label)
    .map((badge) => {
      const logos = [...badge.querySelectorAll("[data-logo]")];

      if (logos.length === 0) {
        throw new Error(`Missing stack logo for ${label}`);
      }

      return logos.map(
        (logo) => `${logo.getAttribute("data-logo")}:${logo.getAttribute("class")}`,
      );
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
      .toEqual(["Projects", ...projects.map(({ name }) => name)]);

    const projectsWithPages = projects.filter(({ href }) => href);
    expect(screen.getAllByRole("link", { name: /open page/i })).toHaveLength(projectsWithPages.length);
    screen.getAllByRole("link", { name: /open page/i }).forEach((link, index) => {
      expect(link).toHaveAttribute("href", projectsWithPages[index].href);
    });
    const projectsWithRepos = projects.filter(({ repoHref }) => repoHref);
    expect(screen.getAllByRole("link", { name: /open project/i })).toHaveLength(
      projectsWithRepos.length,
    );
    screen.getAllByRole("link", { name: /open project/i }).forEach((link, index) => {
      expect(link).toHaveAttribute("href", projectsWithRepos[index].repoHref);
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
    const { container } = render(<App />);

    expect(screen.queryByText("Stack")).not.toBeInTheDocument();
    const renderedFrameworkCounts = getStackBadges(container).reduce((counts, badge) => {
      const name = getStackBadgeName(badge);
      counts.set(name, (counts.get(name) ?? 0) + 1);
      return counts;
    }, new Map());

    expect(renderedFrameworkCounts).toEqual(frameworkCounts);

    expect(screen.queryByText("\\BibTex")).not.toBeInTheDocument();
    expect(screen.queryByText("Vite")).not.toBeInTheDocument();
    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(screen.queryByText("Three.js")).not.toBeInTheDocument();
    expect(screen.queryByText("Fun with WASM")).not.toBeInTheDocument();
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
    expect(container.querySelector("header")).toHaveClass(
      "animate-appear",
      "bg-white/10",
      "shadow-glow",
    );
    expect(container.querySelector(".lucide-badge-check")).toBeInTheDocument();

    for (const card of container.querySelectorAll("article")) {
      expect(card).toHaveClass("group", "animate-appear", "border", "bg-white/10");
      expect(card.querySelector("svg.lucide")).toBeInTheDocument();
    }

    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveClass("inline-flex");
      expect(link.querySelector("svg")).toBeInTheDocument();
    }

    for (const lucideLink of screen.getAllByRole("link", { name: /open page|github$/i })) {
      expect(lucideLink.querySelector("svg.lucide")).toBeInTheDocument();
    }
  });

  it("renders stack logos for the named technologies", () => {
    const { container } = render(<App />);

    const renderedLogoCounts = [...container.querySelectorAll("[data-logo]")].reduce((counts, logo) => {
      const name = logo.getAttribute("data-logo");
      counts.set(name, (counts.get(name) ?? 0) + 1);
      return counts;
    }, new Map());

    expect(renderedLogoCounts).toEqual(logoCounts);
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
    const { container } = render(<App />);

    for (const [label, expectedCount] of frameworkCounts) {
      if (expectedCount < 2) continue;

      const renderedLogoSignatures = getStackBadgeLogoSignatures(container, label);

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
