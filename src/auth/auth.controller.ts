import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() input: LoginUserDto): Promise<{
    access_token: string;
  }> {
    return this.authService.signIn(input.email, input.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signUp(@Body() input: CreateUserDto): Promise<{
    user_id: number;
  }> {
    return this.authService.signUp(input);
  }

  @Get()
  getProfile(@Request() req) {
    return req.user;
  }
}
