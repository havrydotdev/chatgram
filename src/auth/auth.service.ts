import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{
    username: string;
    email: string;
    name: string;
    id: number;
    jwt_token: string;
  }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!comparePasswords(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.username,
      email: user.email,
      name: user.name,
      id: user.id,
    };

    return {
      jwt_token: await this.jwtService.signAsync(payload),
      ...payload,
    };
  }

  async signUp(input: CreateUserDto): Promise<{
    user_id: number;
  }> {
    input.password = encodePassword(input.password);
    const id = await this.usersService.create(input);
    return {
      user_id: id,
    };
  }
}
