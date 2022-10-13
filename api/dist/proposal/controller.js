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
exports.ProposalController = void 0;
const common_1 = require("@nestjs/common");
const create_dto_1 = require("./dto/create.dto");
const update_dto_1 = require("./dto/update.dto");
const service_1 = require("./service");
let ProposalController = class ProposalController {
    constructor(service) {
        this.service = service;
    }
    async index(res, query) {
        const sort = {};
        query.sort
            ? (sort[JSON.parse(query.sort)[0]] =
                JSON.parse(query.sort)[1] === 'ASC' ? 1 : -1)
            : null;
        const range = query.range ? JSON.parse(query.range) : [0, 10];
        const [rangeStart, rangeEnd] = [...range];
        const limit = rangeEnd - rangeStart + 1;
        const skip = rangeStart;
        const filter = query.filter ? JSON.parse(query.filter) : {};
        const result = await this.service.findAll(filter, sort, skip, limit);
        return res
            .set({
            'Content-Range': result.count,
            'Access-Control-Expose-Headers': 'Content-Range',
        })
            .json(result.data);
    }
    async find(id) {
        return await this.service.findOne(id);
    }
    async create(createProposalDto) {
        return await this.service.create(createProposalDto);
    }
    async update(id, updateProposalDto) {
        return await this.service.update(id, updateProposalDto);
    }
    async delete(id) {
        return await this.service.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "index", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "find", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateProposalDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dto_1.UpdateProposalDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "delete", null);
ProposalController = __decorate([
    (0, common_1.Controller)('proposals'),
    __metadata("design:paramtypes", [service_1.ProposalService])
], ProposalController);
exports.ProposalController = ProposalController;
//# sourceMappingURL=controller.js.map