import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const expectedProjects = [
  ["Bibliografi", "https://leonidbresjnev.github.io/bibliografi/"],
  ["Rubik Cube Solver", "https://leonidbresjnev.github.io/rubiks-cube/"],
  ["Bayesian information borrowing", "https://leonidbresjnev.github.io/funwithwasm/"],
  ["Fun with OpenFDA", "https://leonidbresjnev.github.io/funwithopenfda/"],
  ["Crossplatform Capstone Project", "https://leonidbresjnev.github.io/CrossplatformCapstoneProject/"],
];

const implementationCopy = [
  "Built with Vite",
  "Styled with Tailwind",
  "Icons by Lucide",
  "Deployed via GitHub Pages",
  "Crafted for Speed",
];

const readText = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const linkCheckTimeoutMs = 15000;
const externalLinkPatterns = [
  /\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/g,
  /\b(?:href|repoHref):\s*"(https?:\/\/[^"]+)"/g,
  /href="(https?:\/\/[^"]+)"/g,
];
const unverifiedProjectLinks = new Set([
  "https://github.com/LeonidBresjnev/myMediaPlayer",
  "https://github.com/LeonidBresjnev/filterexplorer.git",
]);

const collectExternalLinks = (source, content) => {
  const links = [];

  for (const pattern of externalLinkPatterns) {
    for (const [, href] of content.matchAll(pattern)) {
      links.push({ href, source });
    }
  }

  return links;
};

const fetchLink = async (href) =>
  fetch(href, {
    redirect: "follow",
    signal: AbortSignal.timeout(linkCheckTimeoutMs),
    headers: {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "User-Agent": "jacob-simonsen-landing-link-check/1.0",
    },
  });

test("README presents the landing page and project links in order", async () => {
  const readme = await readText("README.md");

  assert.match(readme, /^# Jacob Simonsen$/m);
  assert.match(readme, /Landing page: https:\/\/leonidbresjnev\.github\.io\//);

  const listedProjects = [...readme.matchAll(/^\d+\.\s+\[([^\]]+)\]\(([^)]+)\)/gm)].map(
    ([, name, href]) => [name, href],
  );

  assert.deepEqual(listedProjects, expectedProjects);
});

test("React app includes the same project links in the intended order", async () => {
  const app = await readText("src/App.jsx");
  let previousIndex = -1;

  for (const [name, href] of expectedProjects) {
    const nameIndex = app.indexOf(`name: "${name}"`);
    const hrefIndex = app.indexOf(`href: "${href}"`);

    assert.ok(nameIndex > previousIndex, `${name} should appear after the previous project`);
    assert.ok(hrefIndex > nameIndex, `${name} should include its GitHub Pages URL`);
    previousIndex = nameIndex;
  }

  assert.match(app, /A landing page for my GitHub projects and published GitHub Pages sites\./);
  assert.match(app, /A visual interface to OpenFDA with text-context search using OpenAI\./);
  assert.match(app, /Tutorial project building a restaurant mobile app with a cross-platform stack\./);
  assert.equal(app.includes('name: "Fun with WASM"'), false);
});

test("HTML shell wires the app and person favicon", async () => {
  const html = await readText("index.html");
  const favicon = await readText("public/favicon.svg");

  assert.match(html, /<title>Jacob Simonsen<\/title>/);
  assert.match(html, /<link rel="icon" type="image\/svg\+xml" href="\.\/favicon\.svg" \/>/);
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /<script type="module" src="\/src\/main\.jsx"><\/script>/);
  assert.match(favicon, /aria-label="Person icon"/);
});

test("landing content avoids removed implementation copy and wiki links", async () => {
  const readme = await readText("README.md");
  const app = await readText("src/App.jsx");
  const combinedContent = `${readme}\n${app}`;

  for (const phrase of implementationCopy) {
    assert.equal(combinedContent.includes(phrase), false, `"${phrase}" should stay out of page content`);
  }

  assert.equal(/wiki/i.test(combinedContent), false, "wiki links should not be present");
});

test("styling stays Tailwind-first and interface icons stay Lucide-first", async () => {
  const css = await readText("src/index.css");
  const app = await readText("src/App.jsx");

  for (const directive of ["@tailwind base;", "@tailwind components;", "@tailwind utilities;"]) {
    assert.ok(css.includes(directive), `${directive} should remain in the global stylesheet`);
  }

  assert.match(css, /body\s*{[^}]*@apply\b[^}]*}/s);
  assert.match(app, /from "lucide-react"/);
  assert.equal(/\bstyle=/.test(app), false, "Inline styles should not replace Tailwind utilities");

  for (const icon of ["ArrowUpRight", "BadgeCheck", "Github", "ExternalLink"]) {
    assert.match(app, new RegExp(`\\b${icon}\\b`), `${icon} should remain a Lucide UI icon`);
  }
});

test("external links resolve without broken responses", { timeout: 45000 }, async () => {
  const files = [
    ["README.md", await readText("README.md")],
    ["src/App.jsx", await readText("src/App.jsx")],
  ];
  const linksByHref = new Map();

  for (const [source, content] of files) {
    for (const { href } of collectExternalLinks(source, content)) {
      const entry = linksByHref.get(href) ?? { href, sources: [] };

      entry.sources.push(source);
      linksByHref.set(href, entry);
    }
  }

  const checkableLinks = [...linksByHref.values()].filter(
    ({ href }) => !unverifiedProjectLinks.has(href),
  );

  assert.ok(checkableLinks.length > 0, "Expected external links to check");

  const failures = [];

  for (const { href, sources } of checkableLinks) {
    try {
      const response = await fetchLink(href);

      if (!response.ok) {
        failures.push(`${href} returned HTTP ${response.status} (${sources.join(", ")})`);
      }
    } catch (error) {
      failures.push(`${href} failed: ${error.message} (${sources.join(", ")})`);
    }
  }

  assert.equal(failures.length, 0, `Broken links found:\n${failures.join("\n")}`);
});
