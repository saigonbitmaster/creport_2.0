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

@Controller('challenges')
export class ChallengeController {
  constructor(
    private readonly service: ChallengeService,
    private readonly fundService: FundService,
  ) {}

  @Get()
  async index(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    return await this.service.create(createChallengeDto);
  }

  @Post('import')
  async import(@Body() importBody: ImportBody) {
    const data = await getSheetData(importBody.sheet, importBody.id, 'A2:E');
    const _data = await challengeTransform(data, this.fundService);
    return this.service.import(_data)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return await this.service.update(id, updateChallengeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
