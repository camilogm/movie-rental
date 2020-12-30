import { UserEntity } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.tokens, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column()
  token: string;

  @Column()
  createAt: Date;
}
