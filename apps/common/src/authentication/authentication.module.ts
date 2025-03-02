import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { DatabaseService } from '../database/database.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'forrest',
      signOptions: { expiresIn: '1m' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, DatabaseService, JwtStrategy],
  exports: [AuthenticationService, JwtModule],
})
export class AuthenticationModule {}
