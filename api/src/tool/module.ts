import { Module } from '@nestjs/common';
import { ToolController } from './controller';
import { HttpModule } from '@nestjs/axios';
import { ToolService } from './service';

@Module({
  imports: [HttpModule],
  controllers: [ToolController],
  providers: [ToolService],
})
export class ToolModule {}
