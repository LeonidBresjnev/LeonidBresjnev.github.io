import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

const projects = [
  ["Bibliografi", "https://leonidbresjnev.github.io/bibliografi/"],
  ["Rubik Cube Solver", "https://leonidbresjnev.github.io/rubiks-cube/"],
  ["Fun with WASM", "https://leonidbresjnev.github.io/funwithwasm/"],
  ["Fun with OpenFDA", "https://leonidbresjnev.github.io/funwithopenfda/"],
];

const getStackBadgeStyles = (label) =>
  screen.getAllByText(label).map((badgeText) => {
    const badge = badgeText.closest("span");

    if (!badge) {
      throw new Error(`Missing stack badge for ${label}`);
    }

    const colorIcon = badge.querySelector("svg");

    if (!colorIcon) {
      throw new Error(`Missing color icon for ${label}`);
    }

    return {
      badgeClass: badge.getAttribute("class"),
      iconClass: colorIcon.getAttribute("class"),
    };
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

    expect(screen.getAllByRole("link", { name: /open project/i })).toHaveLength(projects.length);
    screen.getAllByRole("link", { name: /open project/i }).forEach((link, index) => {
      expect(link).toHaveAttribute("href", projects[index][1]);
    });

    expect(screen.getByText("A visual interface to OpenFDA with text-context search using OpenAI."))
      .toBeInTheDocument();
  });

  it("shows stack badges sourced from the project repositories", () => {
    render(<App />);

    expect(screen.getAllByText("Stack")).toHaveLength(projects.length);
    expect(screen.getByText("BibTeX")).toBeInTheDocument();
    expect(screen.getAllByText("JavaScript/React")).toHaveLength(2);
    expect(screen.queryByText("Vite")).not.toBeInTheDocument();
    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(screen.queryByText("Three.js")).not.toBeInTheDocument();
    expect(screen.getAllByText("Kotlin/WASM")).toHaveLength(2);
    expect(screen.getByText("Kotlin/Ktor")).toBeInTheDocument();
    expect(screen.getAllByText("Jetpack Compose")).toHaveLength(2);
  });

  it("uses consistent GitHub-style colors for repeated stack badges", () => {
    render(<App />);

    for (const label of ["JavaScript/React", "Kotlin/WASM", "Jetpack Compose"]) {
      const renderedStyles = getStackBadgeStyles(label);

      expect(renderedStyles).toHaveLength(2);
      expect(new Set(renderedStyles.map(({ badgeClass }) => badgeClass)).size).toBe(1);
      expect(new Set(renderedStyles.map(({ iconClass }) => iconClass)).size).toBe(1);
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
