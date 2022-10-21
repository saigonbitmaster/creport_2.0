import { GitLink } from '../types/types';
import { Octokit } from '@octokit/core';

const AccountLanguages = async (gitLink: GitLink) => {
  //git link: https://github.com/saigonbitmaster/bWorksPublic
  const gitToken = process.env.GITHUB_TOKEN;
  const result = {};
  const languages = [];
  const gitUrl = gitLink.gitUrl;
  const [owner] =
    gitUrl.split('github.com/').length > 1
      ? gitUrl.split('github.com/')[1].split('/')
      : null;

  const octokit = new Octokit({
    auth: gitToken,
  });
  const repos = await octokit.request(`GET /users/${owner}/repos`, {
    org: owner,
  });

  for await (const item of repos.data) {
    const repoLanguages = await octokit.request(
      `GET /repos/${owner}/${item.name}/languages`,
      {
        owner: owner,
        repo: item.name,
      },
    );

    result[item.name] = repoLanguages.data;
    languages.push(...Object.keys(repoLanguages.data));
  }

  return { details: result, languages: [...new Set(languages)] };
};

const RepoCommits = async (gitLink: string): Promise<any> => {
  const gitToken = process.env.GITHUB_TOKEN;

  const octokit = new Octokit({
    auth: gitToken,
  });

  const [owner, repo] =
    gitLink.split('github.com/').length > 1
      ? gitLink.split('github.com/')[1].split('/')
      : null;

  //https://github.com/saigonbitmaster/bWorksPublic
  const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: owner,
    repo: repo,
  });

  return commits.data.map((item) => ({
    sha: item.sha,
    message: item.commit.message,
    author: item.commit.author.name,
    date: item.commit.committer.date,
    url: item.html_url,
  }));
};

const RepoCodeScan = async (gitLink: string): Promise<any> => {
  const gitToken = process.env.GITHUB_TOKEN;

  const octokit = new Octokit({
    auth: gitToken,
  });

  const [owner, repo] =
    gitLink.split('github.com/').length > 1
      ? gitLink.split('github.com/')[1].split('/')
      : null;

  //https://github.com/saigonbitmaster/bWorksPublic
  let result = [];
  try {
    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/code-scanning/alerts',
      {
        owner: owner,
        repo: repo,
      },
    );
    result = response.data.map((item) => ({
      name: item.rule.id,
      severity: item.rule.severity,
      description: item.rule.description,
      url: item.html_url,
    }));
  } catch (error) {
    result.push({
      name: 'You are not authorized to read code scanning alerts.',
      description: 'the given repo need extra setup for code scanning alerts',
      url: gitLink,
    });
    console.error(error);
  }

  return result;
};

const AccountLanguagesForUser = async (gitLink: GitLink, userId: string) => {
  //git link: https://github.com/saigonbitmaster/bWorksPublic
  const gitToken = process.env.GITHUB_TOKEN;
  const result = {};
  const languages = [];
  if (!gitLink || !gitLink.gitUrl || !gitLink.gitUrl.includes('github.com'))
    return new Error('git error');
  
  const gitUrl = gitLink.gitUrl;
  const [owner] =
    gitUrl.split('github.com/').length > 1
      ? gitUrl.split('github.com/')[1].split('/')
      : null;

  const octokit = new Octokit({
    auth: gitToken,
  });
  const repos = await octokit.request(`GET /users/${owner}/repos`, {
    org: owner,
  });

  for await (const item of repos.data) {
    const repoLanguages = await octokit.request(
      `GET /repos/${owner}/${item.name}/languages`,
      {
        owner: owner,
        repo: item.name,
      },
    );

    result[item.name] = repoLanguages.data;
    languages.push(...Object.keys(repoLanguages.data));
  }
  //insert result into mongo
  return null;
};

export { AccountLanguages, RepoCommits, RepoCodeScan, AccountLanguagesForUser };
