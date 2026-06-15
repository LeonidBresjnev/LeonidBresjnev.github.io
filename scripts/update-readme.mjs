import { readFile, writeFile } from "node:fs/promises";
import { projects } from "../src/projects.js";

const root = new URL("../", import.meta.url);
const readmeUrl = new URL("README.md", root);

const startMarker = "<!-- PROJECTS:START -->";
const endMarker = "<!-- PROJECTS:END -->";

const projectLink = ({ name, href, repoHref }) => {
  if (href && repoHref) {
    return `[${name}](${href}) ([GitHub](${repoHref}))`;
  }

  return `[${name}](${href ?? repoHref})`;
};

const renderProjects = (projects) =>
  projects
    .map((project, index) => {
      const lines = [`${index + 1}. ${projectLink(project)}`];

      for (const { name } of project.frameworks) {
        lines.push(`   - ${name}`);
      }

      return lines.join("\n");
    })
    .join("\n");

const updateReadme = async () => {
  const readme = await readFile(readmeUrl, "utf8");
  const generatedBlock = `${startMarker}\n<!-- This list is generated from src/projects.js by npm run readme:update. -->\n${renderProjects(projects)}\n${endMarker}`;
  const markerPattern = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);

  if (!markerPattern.test(readme)) {
    throw new Error(`README.md must contain ${startMarker} and ${endMarker}`);
  }

  const nextReadme = readme.replace(markerPattern, generatedBlock);

  if (nextReadme !== readme) {
    await writeFile(readmeUrl, nextReadme);
  }
};

await updateReadme();
