import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { addressUtxo } from '../types';
import { Octokit } from '@octokit/core';

@Injectable()
export class ToolService {
  constructor(private readonly httpService: HttpService) {}
  getAddressUtxo(address: string): Promise<addressUtxo[]> {
    const project_id = process.env.BLOCKFROST_PROJECT_ID;
    const blockfrost_url = process.env.BLOCKFROST_URL;

    return this.httpService
      .get(`${blockfrost_url}/addresses/${address}/utxos`, {
        headers: {
          project_id: project_id,
        },
      })
      .pipe(map((resp) => resp.data))
      .toPromise();
  }

  getTxsUtxo(tx_hash: string): Promise<any[]> {
    const project_id = process.env.BLOCKFROST_PROJECT_ID;
    const blockfrost_url = process.env.BLOCKFROST_URL;

    return this.httpService
      .get(`${blockfrost_url}/txs/${tx_hash}/utxos`, {
        headers: {
          project_id: project_id,
        },
      })
      .pipe(map((resp) => resp.data))
      .toPromise();
  }

  async getRepoCommits(gitLink: string): Promise<any> {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
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
  }

  async repoCodeScan(gitLink: string): Promise<any> {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
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
  }
}
