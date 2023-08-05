import { Module } from '@nestjs/common';
import { EventsService } from './service/events/events.service';
import { EventsGateway } from './gateway/events/events.gateway';

@Module({
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
