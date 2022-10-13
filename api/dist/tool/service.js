"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const operators_1 = require("rxjs/operators");
const core_1 = require("@octokit/core");
let ToolService = class ToolService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getAddressUtxo(address) {
        const project_id = process.env.BLOCKFROST_PROJECT_ID;
        const blockfrost_url = process.env.BLOCKFROST_URL;
        return this.httpService
            .get(`${blockfrost_url}/addresses/${address}/utxos`, {
            headers: {
                project_id: project_id,
            },
        })
            .pipe((0, operators_1.map)((resp) => resp.data))
            .toPromise();
    }
    getTxsUtxo(tx_hash) {
        const project_id = process.env.BLOCKFROST_PROJECT_ID;
        const blockfrost_url = process.env.BLOCKFROST_URL;
        return this.httpService
            .get(`${blockfrost_url}/txs/${tx_hash}/utxos`, {
            headers: {
                project_id: project_id,
            },
        })
            .pipe((0, operators_1.map)((resp) => resp.data))
            .toPromise();
    }
    async getRepoCommits(gitLink) {
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const octokit = new core_1.Octokit({
            auth: GITHUB_TOKEN,
        });
        const [owner, repo] = gitLink.split('github.com/').length > 1
            ? gitLink.split('github.com/')[1].split('/')
            : null;
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
    async repoCodeScan(gitLink) {
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const octokit = new core_1.Octokit({
            auth: GITHUB_TOKEN,
        });
        const [owner, repo] = gitLink.split('github.com/').length > 1
            ? gitLink.split('github.com/')[1].split('/')
            : null;
        let result = [];
        try {
            const response = await octokit.request('GET /repos/{owner}/{repo}/code-scanning/alerts', {
                owner: owner,
                repo: repo,
            });
            result = response.data.map((item) => ({
                name: item.rule.id,
                severity: item.rule.severity,
                description: item.rule.description,
                url: item.html_url,
            }));
        }
        catch (error) {
            result.push({
                name: 'You are not authorized to read code scanning alerts.',
                description: 'the given repo need extra setup for code scanning alerts',
                url: gitLink,
            });
            console.error(error);
        }
        return result;
    }
};
ToolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ToolService);
exports.ToolService = ToolService;
//# sourceMappingURL=service.js.map