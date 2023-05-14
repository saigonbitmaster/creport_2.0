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
import { CreateProposerDto } from './dto/create.dto';
import { UpdateProposerDto } from './dto/update.dto';
import { ProposerService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { ImportBody } from '../flatworks/types/types';
import {
  getSheetData,
  proposerTransform,
} from '../flatworks/utils/googleSheet';
import { Role } from '../flatworks/types/types';
import { Public } from '../flatworks/roles/public.api.decorator';
import { Roles } from '../flatworks/roles/roles.decorator';

@Controller('proposers')
export class ProposerController {
  constructor(private readonly service: ProposerService) {}

  @Get()
  @Public()
  async index(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAll(mongooseQuery);
    console.log(1, query, 2, mongooseQuery, 3, result);
    return formatRaList(res, result);
  }

  @Get(':id')
  @Public()
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createProposerDto: CreateProposerDto) {
    return await this.service.create(createProposerDto);
  }

  @Post('import')
  @Roles(Role.Admin)
  async import(@Body() importBody: ImportBody) {
    const data = await getSheetData(importBody.sheet, importBody.id, 'A2:E');
    return await this.service.import(proposerTransform(data));
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateProposerDto: UpdateProposerDto,
  ) {
    return await this.service.update(id, updateProposerDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
