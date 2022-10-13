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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
let ToolController = class ToolController {
    constructor(service) {
        this.service = service;
    }
    async getUtxos(res, query) {
        const range = query.range ? JSON.parse(query.range) : [0, 10];
        const [rangeStart, rangeEnd] = [...range];
        const filter = query.filter ? JSON.parse(query.filter) : null;
        if (!filter.queryType || !filter.value) {
            return res
                .set({
                'Content-Range': 0,
                'Access-Control-Expose-Headers': 'Content-Range',
            })
                .json([]);
        }
        if (filter.queryType === 'utx') {
            const response = await this.service.getTxsUtxo(filter.value);
            return res
                .set({
                'Content-Range': 1,
                'Access-Control-Expose-Headers': 'Content-Range',
            })
                .json([response]);
        }
        const response = await this.service.getAddressUtxo(filter.value);
        const data = response.slice(rangeStart, rangeEnd + 1);
        return res
            .set({
            'Content-Range': response.length,
            'Access-Control-Expose-Headers': 'Content-Range',
        })
            .json(data);
    }
    async getCommits(res, query) {
        const range = query.range ? JSON.parse(query.range) : [0, 10];
        const [rangeStart, rangeEnd] = [...range];
        const filter = query.filter ? JSON.parse(query.filter) : null;
        if (!filter.queryType || !filter.value) {
            return res
                .set({
                'Content-Range': 0,
                'Access-Control-Expose-Headers': 'Content-Range',
            })
                .json([]);
        }
        if (filter.queryType === 'commit') {
            const response = await this.service.getRepoCommits(filter.value);
            const data = response.slice(rangeStart, rangeEnd + 1);
            return res
                .set({
                'Content-Range': response.length,
                'Access-Control-Expose-Headers': 'Content-Range',
            })
                .json(data);
        }
        if (filter.queryType === 'codescan') {
            const response = await this.service.repoCodeScan(filter.value);
            const data = response.slice(rangeStart, rangeEnd + 1);
            return res
                .set({
                'Content-Range': response.length,
                'Access-Control-Expose-Headers': 'Content-Range',
            })
                .json(data);
        }
    }
};
__decorate([
    (0, common_1.Get)('utxos'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ToolController.prototype, "getUtxos", null);
__decorate([
    (0, common_1.Get)('commits'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ToolController.prototype, "getCommits", null);
ToolController = __decorate([
    (0, common_1.Controller)('tools'),
    __metadata("design:paramtypes", [service_1.ToolService])
], ToolController);
exports.ToolController = ToolController;
//# sourceMappingURL=controller.js.map