import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RentBuyEntity } from './rent-buy.entity';

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

  @OneToMany(() => RentBuyEntity, (rentBuy) => rentBuy.state)
  rentBuy?: RentBuyEntity[];
}
