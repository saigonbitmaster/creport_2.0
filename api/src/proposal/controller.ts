import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  Query,
} from '@nestjs/common';
import { CreateProposalDto } from './dto/create.dto';
import { UpdateProposalDto } from './dto/update.dto';
import { ProposalService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { ImportBody } from '../flatworks/types/types';
import {
  getSheetData,
  proposalTransform,
} from '../flatworks/utils/googleSheet';
import { FundService } from '../fund/service';
import { ChallengeService } from '../challenge/service';
import { ProposerService } from '../proposer/service';
import { Public } from '../flatworks/roles/public.api.decorator';
import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';

@Controller('proposals')
export class ProposalController {
  constructor(
    private readonly service: ProposalService,
    private readonly fundService: FundService,
    private readonly challengeService: ChallengeService,
    private readonly proposerService: ProposerService,
  ) {}

  @Get()
  @Public()
  async index(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  @Public()
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post('import')
  @Roles(Role.Admin)
  async import(@Body() importBody: ImportBody) {
    const _data = await getSheetData(importBody.sheet, importBody.id, 'A2:O');
    const data = await proposalTransform(
      _data,
      this.fundService,
      this.challengeService,
      this.proposerService,
    );
    return this.service.import(data);
  }

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createProposalDto: CreateProposalDto) {
    return await this.service.create(createProposalDto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateProposalDto: UpdateProposalDto,
  ) {
    return await this.service.update(id, updateProposalDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
