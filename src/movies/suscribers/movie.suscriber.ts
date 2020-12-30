import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';

@EventSubscriber()
export class MovieSuscriber implements EntitySubscriberInterface<MovieEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return MovieEntity;
  }

  async beforeInsert(event: InsertEvent<MovieEntity>) {
    event.entity.availability = !!event.entity.stock;
  }

  async beforeUpdate(event: UpdateEvent<MovieEntity>) {
    event.entity.availability = !!event.entity.stock;
  }
}
