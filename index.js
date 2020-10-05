const core = require('@actions/core');
const exec = require('@actions/exec');

// TODO: check command and container to defend against injection or hardcode the commands
const command = core.getInput('command');
const container = core.getInput('container');

const cwd = process.cwd();
const workdir = "C:\\dotty";

const ivy_cache = "C:\\ivy-cache:C:\\.ivy2";
const coursier_cache = "C:\\coursier-cache:C:\\Coursier";

const pull_command = `docker pull ${container}`;
const run_command = `docker run --rm -i --isolation process --cpu-count 8 -m 16GB  -v "${cwd}":"${workdir}" -v ${ivy_cache} -v ${coursier_cache} -w ${workdir} ${container} pwsh -Command "${command}"`;

// most @actions toolkit packages have async methods
async function run() {
  try {
    await exec.exec(pull_command);
    await exec.exec(run_command);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
