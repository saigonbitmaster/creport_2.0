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
import { GitCommitModule } from './commit/module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.CONNECTION_STRING,
      }),
    }),
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
    GitCommitModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
