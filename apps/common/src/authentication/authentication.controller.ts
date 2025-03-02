import { Public } from './public.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Prisma } from '@prisma/client';
import { Public } from './public.decorator';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('register')
  async register(@Body() user: Prisma.usersCreateInput) {
    return this.authenticationService.register(user);
  }

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log(body);

    const user = await this.authenticationService.validateUser(
      body.email,
      body.password
    );

    console.log(user);
    return this.authenticationService.login(user);
  }
}
