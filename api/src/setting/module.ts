import { Module, Global } from '@nestjs/common';
import { SettingService } from './service';
import { SettingController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from './schemas/schema';

@Global()
@Module({
  providers: [SettingService],
  controllers: [SettingController],
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
  ],
  exports: [SettingService],
})
export class SettingModule {}
