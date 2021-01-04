import { Transform } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { RentBuyEntity } from '../../rent-buy-movies/entities/rent-buy.entity';
import { TagEntity } from './tag.entity';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 30 })
  title: string;

  @Column({ length: 1000 })
  description: string;

  @Column({ length: 100 })
  poster: string;

  @Column()
  stock: number;

  @Column({ length: 100 })
  trailerLink: string;

  @Column()
  salePrice: number;

  @Column()
  availability: boolean;

  @ManyToMany(() => UserEntity, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  @Transform((likes) => likes.length)
  likes?: UserEntity[];

  @ManyToMany(() => TagEntity, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @Transform((tags: TagEntity[]) => tags?.map((tag) => tag.name))
  tags?: TagEntity[];

  @OneToMany(() => RentBuyEntity, (rentBuy) => rentBuy.movie, {
    onDelete: 'SET NULL',
  })
  rentBuy?: RentBuyEntity[];
}
