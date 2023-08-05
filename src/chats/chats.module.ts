import { Module } from '@nestjs/common';
import { ChatsService } from './services/chats/chats.service';
import { ChatsController } from './controllers/chats/chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
