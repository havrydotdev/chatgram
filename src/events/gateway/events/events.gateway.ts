import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { EventsService } from 'src/events/service/events/events.service';

@WebSocketGateway(80, {
  namespace: 'events',
})
export class EventsGateway {
  constructor(private eventsService: EventsService) {}

  @SubscribeMessage('messages')
  handleMessage(@MessageBody() message: string) {}
}
