import { Transform } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { InvoiceDetailEntity } from './invoice-detail.entity';

@Entity('Invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('decimal', { precision: 5, scale: 2 })
  @Transform((total) => (typeof total === 'number' ? total.toFixed(2) : total))
  total: number;

  @ManyToOne(() => UserEntity, (user) => user.invoices, {
    onDelete: 'SET NULL',
  })
  @Transform((user: UserEntity) => `${user.firstName} ${user.lastName}`)
  user: UserEntity;

  @Column()
  transactionDate: Date;

  @OneToMany(() => InvoiceDetailEntity, (details) => details.invoice, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  details: InvoiceDetailEntity[];
}
