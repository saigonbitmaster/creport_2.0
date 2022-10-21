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

@Controller('proposals')
export class ProposalController {
  constructor(private readonly service: ProposalService) {}

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
  async create(@Body() createProposalDto: CreateProposalDto) {
    return await this.service.create(createProposalDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProposalDto: UpdateProposalDto,
  ) {
    return await this.service.update(id, updateProposalDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}