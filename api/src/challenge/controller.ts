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
import { CreateChallengeDto } from './dto/create.dto';
import { UpdateChallengeDto } from './dto/update.dto';
import { ChallengeService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { ImportBody } from '../flatworks/types/types';
import {
  getSheetData,
  challengeTransform,
} from '../flatworks/utils/googleSheet';
import { FundService } from '../fund/service';
import { Public } from '../flatworks/roles/public.api.decorator';
import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';

@Controller('challenges')
export class ChallengeController {
  constructor(
    private readonly service: ChallengeService,
    private readonly fundService: FundService,
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

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    return await this.service.create(createChallengeDto);
  }

  @Post('import')
  @Roles(Role.Admin)
  async import(@Body() importBody: ImportBody) {
    const _data = await getSheetData(importBody.sheet, importBody.id, 'A2:E');
    const data = await challengeTransform(_data, this.fundService);
    return this.service.import(data);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return await this.service.update(id, updateChallengeDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
