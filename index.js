const core = require('@actions/core');
const github = require('@actions/github');
//const release = require('lib/release');


// most @actions toolkit packages have async methods
async function run() {
  try {
    // set the success output to false to begin with
    core.setOutput('success', false);

    // create a new instance so we can interact with the github api
    const octokit = github.getOctokit(core.getInput('token'));

    const splitRepo = core.getInput('repo').split('/');

    const owner = splitRepo[0];
    const repo = splitRepo[1];

    const {data: issues} = await octokit.repos.listReleases({
      owner: owner,
      repo: repo
    });

    let draft = issues.filter(obj => {
      return obj.draft === true;
    });

    if (Object.keys(draft).length !== 0) {
      core.info(JSON.stringify(draft));
    } else {
      core.info("No Draft found.... implement creating.");
    }

    // Get the prefix from the inputs
    //const prefix = core.getInput('prefix', {required: true});
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
