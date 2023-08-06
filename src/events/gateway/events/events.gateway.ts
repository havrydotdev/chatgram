import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from 'src/messages/services/messages/messages.service';
import { Server } from 'socket.io';
import { UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { UpdateMessageDto } from 'src/messages/dto/update-message.dto';

@WebSocketGateway(80, {
  namespace: 'events',
})
export class EventsGateway {
  constructor(private msgsService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  @SubscribeMessage('newMessage')
  @UsePipes(ValidationPipe)
  async handleMessage(
    @Request() req,
    @MessageBody() message: CreateMessageDto,
  ) {
    const id = await this.msgsService.create(req.user.id, {
      text: message.text,
      chatId: message.chatId,
    });

    this.server.emit('onMessage', {
      id: id,
      text: message.text,
      chatId: message.chatId,
      userId: req.user.id,
    });
  }

  @SubscribeMessage('updateMessage')
  @UsePipes(ValidationPipe)
  async handleUpdateMessage(
    @Request() req,
    @MessageBody() message: UpdateMessageDto,
  ) {
    const msg = await this.msgsService.update(req.user.id, message);

    this.server.emit('onMessageUpdate', msg);
  }
}
