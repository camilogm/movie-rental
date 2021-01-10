import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceDetailEntity } from './invoice-detail.entity';

/**
 * could be rent/buy/delayed
 * defines the state of the opreation of a movie
 */
@Entity('StateMovie')
export class StateMovieEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    length: 20,
  })
  name: string;

  @OneToMany(() => InvoiceDetailEntity, (rentBuy) => rentBuy.state)
  rentBuy?: InvoiceDetailEntity[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
