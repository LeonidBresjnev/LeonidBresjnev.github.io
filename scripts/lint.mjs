import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { projects } from "../src/projects.js";

const readText = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const requiredProjectFields = ["name", "repoHref", "icon", "blurb", "frameworks"];
const validIconNames = new Set(["book", "boxes", "chart", "database", "headphones", "smartphone"]);
const workflowSpecs = [
  {
    label: "Build",
    file: "build.yml",
    requiredContent: ["name: Build", "npm run readme:update", "npm run build"],
    forbiddenContent: ["actions/deploy-pages", "npm run test:content", "npm run lint"],
  },
  {
    label: "Tests",
    file: "tests.yml",
    requiredContent: ["name: Tests", "npm run test:content", "npm run test:app"],
    forbiddenContent: ["actions/deploy-pages", "npm run build"],
  },
  {
    label: "Lint",
    file: "lint.yml",
    requiredContent: ["name: Lint", "npm run lint"],
    forbiddenContent: ["actions/deploy-pages", "npm run build", "npm run test:app"],
  },
  {
    label: "Deploy",
    file: "deploy.yml",
    requiredContent: [
      "name: Deploy",
      "npm run build",
      "actions/upload-pages-artifact",
      "actions/deploy-pages",
    ],
    forbiddenContent: ["npm run lint", "npm run test:app"],
  },
];

const projectLink = ({ name, href, repoHref }) => {
  if (href && repoHref) {
    return `[${name}](${href}) ([GitHub](${repoHref}))`;
  }

  return `[${name}](${href ?? repoHref})`;
};

const renderProjects = () =>
  projects
    .map((project, index) => {
      const lines = [`${index + 1}. ${projectLink(project)}`];

      for (const { name } of project.frameworks) {
        lines.push(`   - ${name}`);
      }

      return lines.join("\n");
    })
    .join("\n");

const lintProjectData = () => {
  assert.ok(projects.length > 0, "Expected at least one project");

  for (const project of projects) {
    for (const field of requiredProjectFields) {
      assert.ok(project[field], `${project.name ?? "Project"} is missing ${field}`);
    }

    assert.ok(validIconNames.has(project.icon), `${project.name} has an unknown icon key`);
    assert.ok(Array.isArray(project.frameworks), `${project.name} frameworks must be an array`);
    assert.ok(project.frameworks.length > 0, `${project.name} needs at least one framework`);

    for (const framework of project.frameworks) {
      assert.ok(framework.name, `${project.name} has a framework without a name`);
      assert.ok(Array.isArray(framework.logos), `${project.name}/${framework.name} logos must be an array`);
      assert.ok(framework.logos.length > 0, `${project.name}/${framework.name} needs at least one logo`);
    }
  }
};

const lintComponents = async () => {
  const app = await readText("src/App.jsx");
  const header = await readText("src/components/LandingHeader.jsx");
  const card = await readText("src/components/ProjectCard.jsx");
  const jsxSources = [
    ["src/App.jsx", app],
    ["src/components/LandingHeader.jsx", header],
    ["src/components/ProjectCard.jsx", card],
  ];

  assert.match(app, /from "\.\/components\/LandingHeader"/);
  assert.match(app, /from "\.\/components\/ProjectCard"/);
  assert.match(app, /from "\.\/projects"/);

  for (const [path, source] of jsxSources) {
    assert.match(source, /import React from "react";/, `${path} must import React for JSX`);
    assert.equal(/\bstyle=/.test(source), false, `${path} should use Tailwind classes instead of inline style`);
  }
};

const lintReadme = async () => {
  const readme = (await readText("README.md")).replaceAll("\r\n", "\n");
  const expectedBlock = [
    "<!-- PROJECTS:START -->",
    "<!-- This list is generated from src/projects.js by npm run readme:update. -->",
    renderProjects(),
    "<!-- PROJECTS:END -->",
  ].join("\n");

  assert.ok(readme.includes(expectedBlock), "README project list is not up to date with src/projects.js");
};

const collectNpmScripts = (source) =>
  [...source.matchAll(/\bnpm\s+run\s+([A-Za-z0-9:_-]+)/g)].map(([, scriptName]) => scriptName);

const lintWorkflowContracts = async () => {
  const readme = (await readText("README.md")).replaceAll("\r\n", "\n");
  const packageJson = JSON.parse(await readText("package.json"));
  const packageScripts = new Set(Object.keys(packageJson.scripts ?? {}));
  const workflowDirectory = new URL("../.github/workflows/", import.meta.url);
  const workflowFiles = new Set(await readdir(workflowDirectory));

  assert.equal(workflowFiles.has("pages.yml"), false, "Remove the old combined pages.yml workflow");

  for (const { label, file, requiredContent, forbiddenContent } of workflowSpecs) {
    assert.ok(workflowFiles.has(file), `Missing ${file} workflow`);

    const workflow = await readText(`.github/workflows/${file}`);
    const badge = `[![${label}](https://github.com/LeonidBresjnev/LeonidBresjnev.github.io/actions/workflows/${file}/badge.svg?branch=main)](https://github.com/LeonidBresjnev/LeonidBresjnev.github.io/actions/workflows/${file})`;

    assert.ok(readme.includes(badge), `README must include the ${label} badge for ${file}`);

    for (const snippet of requiredContent) {
      assert.ok(workflow.includes(snippet), `${file} must include "${snippet}"`);
    }

    for (const snippet of forbiddenContent) {
      assert.equal(workflow.includes(snippet), false, `${file} should not include "${snippet}"`);
    }

    for (const scriptName of collectNpmScripts(workflow)) {
      assert.ok(packageScripts.has(scriptName), `${file} references missing package script "${scriptName}"`);
    }
  }
};

lintProjectData();
await lintComponents();
await lintReadme();
await lintWorkflowContracts();
