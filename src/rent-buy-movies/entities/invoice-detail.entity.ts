import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovieEntity } from '../../movies/entities/movie.entity';
import { StateMovieEntity } from './state-movie.entity';
import { Transform } from 'class-transformer';
import { InvoiceEntity } from './invoice.entity';

@Entity('invoice_detail')
export class InvoiceDetailEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: true,
  })
  returnDate: Date;

  @Column('decimal', { precision: 5, scale: 2 })
  @Transform((price: number) =>
    typeof price === 'number' ? price.toFixed(2) : price,
  )
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => StateMovieEntity, (state) => state.rentBuy)
  @Transform((state: StateMovieEntity) => state.name)
  state: StateMovieEntity;

  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.details, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  invoice?: InvoiceEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.invoiceDetail, {
    onDelete: 'SET NULL',
  })
  @Transform((movie: MovieEntity) => movie.title)
  movie: MovieEntity;
}
