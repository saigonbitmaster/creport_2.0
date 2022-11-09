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
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
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
