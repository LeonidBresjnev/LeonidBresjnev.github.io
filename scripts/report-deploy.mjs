import { appendFile } from "node:fs/promises";

const deployStatus = process.env.DEPLOY_STATUS ?? "Unknown";
const pageUrl = process.env.PAGE_URL || "Unavailable";
const environmentName = process.env.DEPLOY_ENVIRONMENT ?? "github-pages";
const commit = process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(0, 7) : "local";
const branch = process.env.GITHUB_REF_NAME ?? "local";
const workflow = process.env.GITHUB_WORKFLOW ?? "Deploy";
const runUrl =
  process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : null;

const lines = [
  "# Deploy Summary",
  "",
  `Status: ${deployStatus}`,
  `Environment: ${environmentName}`,
  `Page URL: ${pageUrl}`,
  `Source: ${branch} (${commit})`,
  `Workflow: ${workflow}`,
];

if (runUrl) {
  lines.push(`Run: ${runUrl}`);
}

const summary = `${lines.join("\n")}\n`;

if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
}

console.log(summary);
