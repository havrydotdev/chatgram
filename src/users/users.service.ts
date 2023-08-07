import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(user: CreateUserDto): Promise<number> {
    const result = await this.usersRepo.insert(user);
    return result.identifiers[0].id;
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOneBy({
      email: email,
    });
  }
}
