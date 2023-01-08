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
import { CreateFundDto } from './dto/create.dto';
import { UpdateFundDto } from './dto/update.dto';
import { FundService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { ImportBody } from '../flatworks/types/types';
import { getSheetData, fundTransform } from '../flatworks/utils/googleSheet';

@Controller('funds')
export class FundController {
  constructor(private readonly service: FundService) {}

  @Get()
  async index(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Post('import')
  async import(@Body() importBody: ImportBody) {
    const data = await getSheetData(importBody.sheet, importBody.id, 'A2:E');
    return await this.service.import(fundTransform(data));
  }

  @Post()
  async create(@Body() createFundDto: CreateFundDto) {
    return await this.service.create(createFundDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFundDto: UpdateFundDto) {
    return await this.service.update(id, updateFundDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
