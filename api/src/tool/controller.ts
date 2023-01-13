import {
  Controller,
  Get,
  Response,
  Query,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ToolService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { ImportBody } from '../flatworks/types/types';
import { getSheetData } from '../flatworks/utils/googleSheet';
import { Public } from '../decorators/public.api.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../types';
@Controller('tools')
export class ToolController {
  constructor(private readonly service: ToolService) {}

  //import data from google sheets
  //use findAndUpdate with upsert = true to insert record
  @Post('import')
  @Roles(Role.Admin)
  async create(@Body() importBody: ImportBody) {
    const result = await getSheetData(
      'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0',
      'funds',
      'A2:E',
    );
    console.log(result);
  }

  @Get('utxos')
  @Public()
  async getUtxos(@Response() res: any, @Query() query) {
    const _query = queryTransform(query);
    const filter = _query.filter;
    const rangeStart = _query.skip;
    const rangeEnd = _query.limit + _query.skip;
    let result;

    if (!filter.queryType || !filter.value) {
      result = { count: 0, data: [] };
      return formatRaList(res, result);
    }

    //get utxos of a tx_hash, query utx return only 1 record.
    if (filter.queryType === 'utx') {
      const response = await this.service.getTxsUtxo(filter.value);
      result = { count: 1, data: [response] };
      return formatRaList(res, result);
    }

    //get utxos of a address, query utx return array.
    const response = await this.service.getAddressUtxo(filter.value);
    const data = response.slice(rangeStart, rangeEnd);

    result = { count: data.length, data: data };
    return formatRaList(res, result);
  }

  @Get('commits')
  @Public()
  async getCommits(@Response() res: any, @Query() query) {
    const _query = queryTransform(query);
    const filter = _query.filter;
    const rangeStart = _query.skip;
    const rangeEnd = _query.limit + _query.skip;
    let result;

    if (!filter.queryType || !filter.value) {
      result = { count: 0, data: [] };
      return formatRaList(res, result);
    }

    if (filter.queryType === 'commit') {
      const response = await this.service.getRepoCommits(filter.value);
      const data = response.slice(rangeStart, rangeEnd);
      result = { count: data.length, data: data };
      return formatRaList(res, result);
    }

    if (filter.queryType === 'codescan') {
      const response = await this.service.repoCodeScan(filter.value);
      const data = response.slice(rangeStart, rangeEnd);
      result = { count: data.length, data: data };
      return formatRaList(res, result);
    }
  }
}
