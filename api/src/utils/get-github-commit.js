const { Octokit } = require("@octokit/core");
//const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_TOKEN = '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'

//const octokit = new Octokit({ auth: `personal-access-token123` });
/* 
const response = await octokit.request("GET /orgs/{org}/repos", {
  org: "octokit",
  type: "private",
});
 */

//https://docs.github.com/en/rest/branches/branches
//get commits of a git repo
async function checkGit (gitLink) {
  const octokit = new Octokit({
    auth: "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",
  });

  const [owner, repo] =
    gitLink.split("github.com/").length > 1
      ? gitLink.split("github.com/")[1].split("/")
      : null;


  //https://github.com/saigonbitmaster/bWorksPublic
  let commits = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner: owner,
    repo: repo,
  });

 

 console.log("commits:", commits.data.map(item => ({message : item.commit.message, author: item.commit.committer.name, date: item.commit.committer.date, url: item.html_url})));

 return commits.data.map(item => ({message : item.commit.message, author: item.commit.committer.name, date: item.commit.committer.date, url: item.html_url}))
}

checkGit('https://github.com/saigonbitmaster/bWorksPublic')
module.exports = {checkGit}