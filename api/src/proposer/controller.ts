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

@Controller('proposers')
export class ProposerController {
  constructor(private readonly service: ProposerService) {}

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
  async create(@Body() createProposerDto: CreateProposerDto) {
    return await this.service.create(createProposerDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProposerDto: UpdateProposerDto,
  ) {
    return await this.service.update(id, updateProposerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
