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
  Request,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { queryTransform } from '../flatworks/utils/getlist';
import { Public } from '../flatworks/roles/public.api.decorator';

@Controller('customapis')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @Get('cmssearch')
  @Public()
  async indexCms(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result: any = await this.service.findAllCms(mongooseQuery.filter);
    return res.json(result);
  }

  @Get('websearch')
  @Public()
  async indexWeb(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result: any = await this.service.findAllWeb(mongooseQuery.filter);
    return res.json(result);
  }
}
