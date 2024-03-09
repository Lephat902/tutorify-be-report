import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ReportService } from './report.service';
import {
  CreateReportDto,
  ReportQueryDto,
  ReportResponseDto,
} from './domains/dtos';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @MessagePattern({ cmd: 'createReport' })
  async addReport(createReportDto: CreateReportDto) {
    return await this.reportService.create(createReportDto);
  }

  @MessagePattern({ cmd: 'findAllReports' })
  async findAllReports(reportQueryDto: ReportQueryDto) {
    return this.reportService.findAll(reportQueryDto);
  }

  @MessagePattern({ cmd: 'resolveReport' })
  async resolveReport(id: number) {
    return this.reportService.resolve(id);
  }

  @MessagePattern({ cmd: 'rejectReport' })
  async rejectReport(id: number) {
    return this.reportService.reject(id);
  }
}
