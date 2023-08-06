import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { UpdateMessageDto } from 'src/messages/dto/update-message.dto';
import { Message } from 'src/messages/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private msgsRepo: Repository<Message>,
  ) {}

  getByChat(chatId: number): Promise<Message[]> {
    return this.msgsRepo.find({
      where: {
        chat: {
          id: chatId,
        },
      },
      order: {
        created_at: 'ASC',
      },
    });
  }

  async create(
    chatId: number,
    userId: number,
    dto: CreateMessageDto,
  ): Promise<number> {
    const res = await this.msgsRepo.save({
      chat: {
        id: chatId,
      },
      user: {
        id: userId,
      },
      ...dto,
    });
    return res.id;
  }

  async update(
    userId: number,
    messageId: number,
    dto: UpdateMessageDto,
  ): Promise<Message> {
    this.checkMessage(messageId, userId);

    return await this.msgsRepo.save({
      id: messageId,
      ...dto,
    });
  }

  async delete(userId: number, messageId: number) {
    this.checkMessage(messageId, userId);

    return await this.msgsRepo.delete({
      id: messageId,
    });
  }

  async checkMessage(messageId: number, userId: number) {
    const messages = await this.msgsRepo.find({
      where: {
        id: messageId,
      },
      relations: {
        user: true,
      },
    });

    if (messages.length === 1) {
      if (messages[0].user.id !== userId) {
        throw new UnauthorizedException();
      }
    } else {
      throw new BadRequestException();
    }
  }
}
