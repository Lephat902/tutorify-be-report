import { DataSource, Repository } from 'typeorm';
import { Report } from './domains/entities';
import { ReportQueryDto } from './domains/dtos/report-query.dto';
import { Injectable } from '@nestjs/common';
import { ReportOrderBy, SortingDirection } from '@tutorify/shared';

@Injectable()
export class ReportRepository extends Repository<Report> {
  constructor(private dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }

  async findAll(reportQueryDto: ReportQueryDto) {
    let queryBuilder = this.dataSource.createQueryBuilder(Report, 'report');

    queryBuilder = queryBuilder.select([
      'report.id',
      'report.reason',
      'LEFT(report.reason, 20) AS truncated_reason',
      'report.createdAt',
      'report.entityId',
      'report.userId',
      'report.status',
      'report.type',
    ]);

    const { q, order, reportType, dir, page, limit } = reportQueryDto;
    if (q) queryBuilder = queryBuilder.andWhere('report.reason = :q', { q });

    if (reportType)
      queryBuilder = queryBuilder.andWhere('report.type = :reportType', {
        reportType,
      });

    queryBuilder = queryBuilder.orderBy(
      `report.${order ?? ReportOrderBy.CREATED_AT}`,
      dir ?? SortingDirection.DESC,
    );

    if (page && limit) {
      queryBuilder = queryBuilder.skip((page - 1) * limit).take(limit);
    }

    const res = await queryBuilder.getMany();
    return res;
  }
}
