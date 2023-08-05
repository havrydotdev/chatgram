import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { UpdateChatDto } from 'src/chats/dto/update-chat.dto';
import { Chat } from 'src/chats/entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(@InjectRepository(Chat) private chatsRepo: Repository<Chat>) {}

  getAllByUser(userId: number): Promise<Chat[]> {
    return this.chatsRepo.find({
      where: {
        users: {
          id: userId,
        },
      },
      order: {
        messages: {
          created_at: 'ASC',
        },
      },
    });
  }

  async create(chat: CreateChatDto): Promise<number> {
    const res = await this.chatsRepo.insert(chat);
    return res.identifiers[0].id;
  }

  async update(id: number, chat: UpdateChatDto): Promise<Chat> {
    const res = await this.chatsRepo.save({
      id: id,
      ...chat,
    });

    return res;
  }

  async delete(id: number): Promise<void> {
    await this.chatsRepo.delete({
      id: id,
    });
  }
}
