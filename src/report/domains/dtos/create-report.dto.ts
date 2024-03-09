import { ReportType } from '@tutorify/shared';

export class CreateReportDto {
  readonly reason: string;
  readonly type: ReportType;
  readonly userId: string;
  readonly entityId: string;
}
