import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ReportStatus, ReportType } from '@tutorify/shared';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column({
    type: 'enum',
    enum: ReportType,
    default: ReportType.FEEDBACK,
  })
  type: ReportType;

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.UNRESOLVED,
  })
  status: ReportStatus;

  @Column()
  userId: string;

  @Column()
  entityId: string;

  @CreateDateColumn()
  createdAt: Date;
}
