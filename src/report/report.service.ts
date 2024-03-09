import { Injectable } from '@nestjs/common';
import { ReportRepository } from './report.repository';
import { ReportQueryDto } from './domains/dtos/report-query.dto';
import { CreateReportDto, ReportResponseDto } from './domains/dtos';
import { ReportStatus } from '../../../shared/src';

@Injectable()
export class ReportService {
  constructor(private reportRepository: ReportRepository) {}

  create(createReportDto: CreateReportDto) {
    const reportEntity = this.reportRepository.create(createReportDto);

    return this.reportRepository.save(reportEntity);
  }

  findAll(reportQueryDto: ReportQueryDto) {
    return this.reportRepository.findAll(reportQueryDto);
  }

  async resolve(id: number) {
    const resolvedReportEntity = this.reportRepository.create({
      id,
      status: ReportStatus.RESOLVED,
    });

    return this.reportRepository.save(resolvedReportEntity);
  }

  async reject(id: number) {
    const resolvedReportEntity = this.reportRepository.create({
      id,
      status: ReportStatus.REJECTED,
    });

    return this.reportRepository.save(resolvedReportEntity);
  }
}
