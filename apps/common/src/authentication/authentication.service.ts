import { Prisma } from '@prisma/client';
import { DatabaseService } from './../database/database.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService
  ) {}

  create(user: Prisma.usersCreateInput) {
    console.log('This action adds a new authentication');
    return this.databaseService.users.create({
      data: user,
    });
  }

  findAll() {
    console.log(`This action returns all authentication`);

    return this.databaseService.users.findMany();
  }

  findOne(id: string) {
    console.log(`This action returns a #${id} authentication`);
    return this.databaseService.users.findUnique({
      where: { id },
    });
  }

  findEmail(email: string) {
    console.log(`This action returns a #${email} authentication`);
    return this.databaseService.users.findUnique({
      where: { email },
    });
  }

  update(id: string, user: Prisma.usersUpdateInput) {
    console.log(`This action updates a #${id} authentication`);
    return this.databaseService.users.update({
      where: { id },
      data: user,
    });
  }

  remove(id: string) {
    console.log(`This action removes a #${id} authentication`);
    return this.databaseService.users.delete({ where: { id } });
  }

  async validateUser(email: string, password: string) {
    if (!email) {
      throw new UnauthorizedException('email is required');
    }

    const user = await this.findEmail(email);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid credentials');
    }
    return user;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async register(user: Prisma.usersCreateInput) {
    const existUser = await this.findEmail(user.email);

    if (existUser) {
      throw new UnauthorizedException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.create({
      ...user,
      password: hashedPassword,
    });
  }
}
