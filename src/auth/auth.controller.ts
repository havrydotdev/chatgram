import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @UsePipes(ValidationPipe)
  async signIn(@Body() input: LoginUserDto) {
    const user = await this.usersService.findOneByEmail(input.email);
    if (!user) {
      throw new BadRequestException({
        error: 'user does not exist',
      });
    }

    return this.authService.signIn(user.email, input.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  @UsePipes(ValidationPipe)
  async signUp(@Body() input: CreateUserDto): Promise<{
    user_id: number;
  }> {
    return this.authService.signUp(input);
  }

  @Get()
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}
