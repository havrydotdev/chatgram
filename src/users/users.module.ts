import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { FilesService } from 'src/files/files.service';
import { UsersController } from './users.controller';
import { FilesModule } from 'src/files/files.module';
import PublicFile from 'src/files/entities/public-file.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, PublicFile]), FilesModule],
  providers: [UsersService, FilesService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
