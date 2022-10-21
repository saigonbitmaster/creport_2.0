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
import { CreateGitCommitDto } from './dto/create.dto';
import { UpdateGitCommitDto } from './dto/update.dto';
import { GitCommitService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

@Controller('commits')
export class GitCommitController {
  constructor(private readonly service: GitCommitService) {}

  @Get()
  async index(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    if (!mongooseQuery.filter || !mongooseQuery.filter.proposalId) {
      //count = 1 to get frontend list render filter to select proposal
      return formatRaList(res, { count: 1, data: [] });
    }
    const result = await this.service.findAll(mongooseQuery);

    return formatRaList(res, result);
  }

  @Post()
  async create(@Body() createGitCommitDto: CreateGitCommitDto) {
    return await this.service.create(createGitCommitDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGitCommitDto: UpdateGitCommitDto,
  ) {
    return await this.service.update(id, updateGitCommitDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
