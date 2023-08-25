import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { UpdateChatDto } from 'src/chats/dto/update-chat.dto';
import { Chat } from 'src/chats/entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(@InjectRepository(Chat) private chatsRepo: Repository<Chat>) {}

  async getAllByUser(userId: number): Promise<Chat[]> {
    const chats = await this.chatsRepo.find({
      where: {
        users: {
          id: userId,
        },
      },
      order: {
        messages: {
          created_at: 'DESC',
        },
      },
      relations: {
        users: {
          avatar: true,
        },
        avatar: true,
        messages: false,
      },
    });

    for (const chat of chats) {
      if (!chat.avatar) {
        chat.avatar = {
          url: chat.users.at(-1).avatar.url,
          key: chat.name,
        };
      }
    }

    return chats;
  }

  async create(userId: number, chat: CreateChatDto): Promise<number> {
    const res = await this.chatsRepo.save({
      users: [
        {
          id: userId,
        },
      ],
      ...chat,
    });
    return res.id;
  }

  async update(userId: number, id: number, dto: UpdateChatDto): Promise<Chat> {
    const chats = await this.chatsRepo.find({
      where: {
        id: id,
      },
      relations: {
        users: true,
      },
    });

    if (chats[0].users.filter((user) => user.id === userId).length !== 1) {
      throw new UnauthorizedException();
    }

    return await this.chatsRepo.save({
      id: id,
      ...dto,
    });
  }

  async delete(userId: number, id: number): Promise<void> {
    const chats = await this.chatsRepo.find({
      where: {
        id: id,
      },
      relations: {
        users: true,
      },
    });

    if (chats[0].users.filter((user) => user.id === userId).length !== 1) {
      throw new UnauthorizedException();
    }

    await this.chatsRepo.delete({
      id: id,
    });
  }
}
