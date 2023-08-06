import { Module } from '@nestjs/common';
import { EventsService } from './service/events/events.service';
import { EventsGateway } from './gateway/events/events.gateway';
import { MessagesService } from 'src/messages/services/messages/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/messages/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [EventsGateway, EventsService, MessagesService],
})
export class EventsModule {}
