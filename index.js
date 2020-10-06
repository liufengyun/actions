const core = require('@actions/core');
const exec = require('@actions/exec');

// To defend against injection, never splice the parameters into a string command
const command = core.getInput('command');
const container = core.getInput('container');

const cwd = process.cwd();
const workdir = "C:\\dotty";

const pull_command = ["pull", container];
const run_command = [
  "run", "--rm", "-i",
  "--isolation", "hyperv",
  "--cpu-count", "8",
  "-m", "16GB",
  "-v", `"${cwd}":"${workdir}"`,
  "-v", "C:\\ivy-cache:C:\\.ivy2",
  "-v", "C:\\coursier-cache:C:\\Coursier",
  "-w", workdir,
  container,
  "pwsh", "-Command", command
];

// most @actions toolkit packages have async methods
async function run() {
  try {
    await exec.exec("docker", pull_command);
    await exec.exec("docker", run_command);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
