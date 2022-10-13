import { ProposalModule } from './proposal/module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProposerModule } from './proposer/module';
import { FundModule } from './fund/module';
import { ChallengeModule } from './challenge/module';
import { ConfigModule } from '@nestjs/config';
import { ToolModule } from './tool/module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:123456@localhost:27017/creport2?authSource=admin&readPreference=primary',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ProposerModule,
    FundModule,
    ChallengeModule,
    ProposalModule,
    ToolModule,
  ],
})
export class AppModule {}
