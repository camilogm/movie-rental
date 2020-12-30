import { UserEntity } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { StateMovieEntity } from './state-movie.entity';
import { Transform } from 'class-transformer';

@Entity('RentBuy')
export class RentBuyEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  transactionDate: Date;

  @Column({
    nullable: true,
  })
  returnDate: Date;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @ManyToOne(() => UserEntity, (user) => user.rentBuy, {
    onDelete: 'SET NULL',
  })
  @Transform((user: UserEntity) => `${user.firstName} ${user.lastName}`)
  user: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.rentBuy, {
    onDelete: 'SET NULL',
  })
  @Transform((movie: MovieEntity) => movie.title)
  movie: MovieEntity;

  @Transform((state: StateMovieEntity) => state.name)
  @ManyToOne(() => StateMovieEntity, (state) => state.rentBuy)
  state: StateMovieEntity;
}
