import { ReportStatus, ReportType } from '@tutorify/shared';

export class ReportResponseDto {
  readonly id: number;
  readonly reason: string;
  readonly createdAt: Date;
  readonly type: ReportType;
  readonly status: ReportStatus;
  readonly userId: string;
  readonly entityId: string;
  readonly truncatedReason: string;
}
