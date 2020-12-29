import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
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
    onDelete: 'CASCADE',
  })
  @JoinTable()
  likes?: UserEntity[];

  @ManyToMany(() => TagEntity, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @Exclude()
  tags?: TagEntity[];
}
