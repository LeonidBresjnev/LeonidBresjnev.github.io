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
    "Fun with WASM",
    "https://leonidbresjnev.github.io/funwithwasm/",
    "https://github.com/LeonidBresjnev/funwithwasm",
  ],
  [
    "Fun with OpenFDA",
    "https://leonidbresjnev.github.io/funwithopenfda/",
    "https://github.com/LeonidBresjnev/visualopenfda",
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

    expect(screen.getAllByRole("link", { name: /open page/i })).toHaveLength(projects.length);
    screen.getAllByRole("link", { name: /open page/i }).forEach((link, index) => {
      expect(link).toHaveAttribute("href", projects[index][1]);
    });
    expect(screen.getAllByRole("link", { name: /open project/i })).toHaveLength(projects.length);
    screen.getAllByRole("link", { name: /open project/i }).forEach((link, index) => {
      expect(link).toHaveAttribute("href", projects[index][2]);
    });

    expect(screen.getByText("A visual interface to OpenFDA with text-context search using OpenAI."))
      .toBeInTheDocument();
  });

  it("shows stack badges sourced from the project repositories", () => {
    render(<App />);

    expect(screen.getAllByText("Stack")).toHaveLength(projects.length);
    expect(screen.getByLabelText("BibTeX")).toBeInTheDocument();
    expect(screen.queryByText("\\BibTex")).not.toBeInTheDocument();
    expect(screen.getAllByText("JavaScript/React")).toHaveLength(2);
    expect(screen.queryByText("Vite")).not.toBeInTheDocument();
    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(screen.queryByText("Three.js")).not.toBeInTheDocument();
    expect(screen.getAllByText("Kotlin/WASM")).toHaveLength(2);
    expect(screen.getByText("Kotlin/Ktor")).toBeInTheDocument();
    expect(screen.getAllByText("Jetpack Compose")).toHaveLength(2);
  });

  it("renders stack logos for the named technologies", () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll('[data-logo="bibtex"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-logo="javascript"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-logo="react"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-logo="kotlin"]')).toHaveLength(3);
    expect(container.querySelectorAll('[data-logo="ktor"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-logo="compose"]')).toHaveLength(2);
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
  });

  it("uses consistent logos for repeated stack badges", () => {
    render(<App />);

    for (const label of ["JavaScript/React", "Kotlin/WASM", "Jetpack Compose"]) {
      const renderedLogoSignatures = getStackBadgeLogoSignatures(label);

      expect(renderedLogoSignatures).toHaveLength(2);
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
