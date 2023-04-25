import { Controller, Get, Param, Response, Query } from '@nestjs/common';
import { ProposalService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { Public } from '../flatworks/roles/public.api.decorator';

@Controller('kpis')
export class ProposalKpiController {
  constructor(private readonly service: ProposalService) {}

  @Get()
  @Public()
  async index(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAllKpi(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  @Public()
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
}
