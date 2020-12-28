import { Exclude, Expose, Transform } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  @Expose()
  id: number;

  @Column({ length: 30 })
  @Expose()
  firstName: string;

  @Column({ length: 30 })
  @Expose()
  lastName: string;

  @Column({ length: 20, unique: true })
  @Expose()
  userName: string;

  @Column({ length: 255, unique: true })
  @Exclude()
  password: string;

  @Expose({ name: 'role' })
  @Transform((role: Role) => role.name)
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
