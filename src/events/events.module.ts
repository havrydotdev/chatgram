import { Module } from '@nestjs/common';
import { EventsGateway } from './gateway/events.gateway';
import { EventsService } from './service/events/events.service';

@Module({
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
