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
import { CreateSettingDto } from './dto/create.dto';
import { UpdateSettingDto } from './dto/update.dto';
import { SettingService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { Public } from '../flatworks/roles/public.api.decorator';
import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';

@Controller('settings')
export class SettingController {
  constructor(private readonly service: SettingService) {}

  @Get()
  @Public()
  async index(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  @Public()
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createSettingDto: CreateSettingDto) {
    return await this.service.create(createSettingDto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return await this.service.update(id, updateSettingDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
