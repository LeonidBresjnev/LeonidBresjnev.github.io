import { appendFile, readdir, readFile, stat } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const distRoot = new URL("../dist/", import.meta.url);

const formatBytes = (bytes) => {
  if (bytes === 0) {
    return "0 B";
  }

  const units = ["B", "kB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;

  return `${value.toFixed(exponent === 0 ? 0 : 2)} ${units[exponent]}`;
};

const readJson = async (path) => JSON.parse(await readFile(new URL(path, projectRoot), "utf8"));

const collectFiles = async (directoryUrl, basePath = "") => {
  const entries = await readdir(directoryUrl, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
    const entryUrl = new URL(entry.name, directoryUrl);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(new URL(`${entry.name}/`, directoryUrl), relativePath)));
      continue;
    }

    if (entry.isFile()) {
      const { size } = await stat(entryUrl);

      files.push({ path: relativePath, size });
    }
  }

  return files;
};

const getDistFiles = async () => {
  try {
    return await collectFiles(distRoot);
  } catch (error) {
    if (error?.code === "ENOENT") {
      return null;
    }

    throw error;
  }
};

const renderBuildSummary = async () => {
  const packageJson = await readJson("package.json");
  const files = await getDistFiles();
  const status = process.env.BUILD_STATUS ?? (files ? "Completed" : "No dist output found");
  const sourceSha = process.env.SOURCE_SHA || process.env.GITHUB_SHA;
  const commit = sourceSha ? sourceSha.slice(0, 7) : "local";
  const branch = process.env.GITHUB_REF_NAME ?? "local";
  const runUrl =
    process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
      ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : null;

  const lines = [
    "# Build Summary",
    "",
    `Status: ${status}`,
    `Project: ${packageJson.name}@${packageJson.version}`,
    `Source: ${branch} (${commit})`,
  ];

  if (runUrl) {
    lines.push(`Run: ${runUrl}`);
  }

  lines.push("");

  if (!files) {
    lines.push("No `dist` directory was available to inspect.");
    return `${lines.join("\n")}\n`;
  }

  const totalSize = files.reduce((total, file) => total + file.size, 0);
  const largestFiles = [...files].sort((left, right) => right.size - left.size).slice(0, 8);
  const assetCounts = files.reduce((counts, file) => {
    const extension = file.path.includes(".") ? file.path.split(".").pop() : "no-extension";

    counts.set(extension, (counts.get(extension) ?? 0) + 1);
    return counts;
  }, new Map());

  lines.push(`Output files: ${files.length}`);
  lines.push(`Output size: ${formatBytes(totalSize)}`);
  lines.push("");
  lines.push("## Asset Types");
  lines.push("");
  lines.push("| Type | Files |");
  lines.push("| --- | ---: |");

  for (const [extension, count] of [...assetCounts.entries()].sort(([left], [right]) => left.localeCompare(right))) {
    lines.push(`| ${extension} | ${count} |`);
  }

  lines.push("");
  lines.push("## Largest Outputs");
  lines.push("");
  lines.push("| File | Size |");
  lines.push("| --- | ---: |");

  for (const file of largestFiles) {
    lines.push(`| \`${file.path}\` | ${formatBytes(file.size)} |`);
  }

  return `${lines.join("\n")}\n`;
};

const writeSummary = async (summary) => {
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
  }

  console.log(summary);
};

await writeSummary(await renderBuildSummary());
