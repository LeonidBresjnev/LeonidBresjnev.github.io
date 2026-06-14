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
