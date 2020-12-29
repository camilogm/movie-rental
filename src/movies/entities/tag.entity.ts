import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    length: 30,
    unique: true,
  })
  name: string;
}
