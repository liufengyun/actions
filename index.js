const core = require('@actions/core');
const exec = require('@actions/exec');

const command = core.getInput('command');

// most @actions toolkit packages have async methods
async function run() {
  try {
    await exec.exec(command);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
