import { Module } from '@nestjs/common';
import { EventsService } from './service/events/events.service';
import { EventsGateway } from './gateway/events/events.gateway';
import { MessagesService } from 'src/messages/services/messages/messages.service';

@Module({
  providers: [EventsGateway, EventsService],
  imports: [MessagesService],
})
export class EventsModule {}
