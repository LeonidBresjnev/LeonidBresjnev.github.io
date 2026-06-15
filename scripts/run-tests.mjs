import { spawnSync } from "node:child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const args = process.argv.slice(2);
const appTestArgs = args.length === 1 && args[0] === "run" ? [] : args;

const run = (commandArgs) =>
  spawnSync(npmCommand, commandArgs, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

const contentTests = run(["run", "test:content"]);

if (contentTests.status !== 0) {
  process.exit(contentTests.status ?? 1);
}

const appCommand = ["run", "test:app"];

if (appTestArgs.length > 0) {
  appCommand.push("--", ...appTestArgs);
}

const appTests = run(appCommand);

process.exit(appTests.status ?? 1);
