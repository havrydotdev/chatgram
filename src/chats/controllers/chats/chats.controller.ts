import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { UpdateChatDto } from 'src/chats/dto/update-chat.dto';
import { Chat } from 'src/chats/entities/chat.entity';
import { ChatsService } from 'src/chats/services/chats/chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get()
  getAllByUser(@Request() req): Promise<Chat[]> {
    return this.chatsService.getAllByUser(req.user.id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async create(
    @Request() req,
    @Body() chat: CreateChatDto,
  ): Promise<{
    id: number;
  }> {
    const id = await this.chatsService.create(req.user.id, chat);
    return { id };
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) chatId: number,
    @Body() chat: UpdateChatDto,
  ): Promise<Chat> {
    return this.chatsService.update(req.user.id, chatId, chat);
  }

  @Delete(':id')
  async delete(
    @Request() req,
    @Param('id', ParseIntPipe) chatId: number,
  ): Promise<void> {
    return this.chatsService.delete(req.user.id, chatId);
  }
}
