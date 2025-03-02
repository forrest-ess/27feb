import { DatabaseService } from './../database/database.service';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationController } from '../authentication/authentication.controller';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Throttle, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@Module({
  imports: [
    DatabaseModule,
    AuthenticationModule,
    // ThrottlerModule.forRoot([{ ttl: 6000, limit: 3 }]),
  ],
  controllers: [AppController, AuthenticationController],
  providers: [
    AppService,
    DatabaseService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthenticationModule, DatabaseModule],
})
export class AppModule {}
