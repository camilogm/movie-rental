import { Exclude, Expose, Transform } from 'class-transformer';
import { TokenEntity } from '../../auth/entities/token.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { InvoiceEntity } from '../../rent-buy-movies/entities/invoice.entity';

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

  @Column({ length: 50, unique: true })
  @Expose()
  email: string;

  @Column({ length: 255, unique: true })
  @Exclude()
  password: string;

  @Expose({ name: 'role' })
  @Transform((role: RoleEntity) => role.name)
  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;

  @OneToMany(() => TokenEntity, (token) => token.user, {
    onDelete: 'CASCADE',
  })
  tokens?: TokenEntity[];

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.user, {
    onDelete: 'SET NULL',
  })
  invoices?: InvoiceEntity[];
}
