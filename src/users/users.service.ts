import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly filesService: FilesService,
  ) {}

  async create(user: CreateUserDto): Promise<number> {
    const result = await this.usersRepo.insert(user);
    return result.identifiers[0].id;
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOneBy({
      email: email,
    });
  }

  async getById(id: number) {
    const user = await this.usersRepo.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const user = await this.getById(userId);
    await this.usersRepo.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }
}
