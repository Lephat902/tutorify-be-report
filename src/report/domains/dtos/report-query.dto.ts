import {
  PaginationDto,
  ReportOrderBy,
  ReportType,
  SortingDirectionDto,
  applyMixins,
} from '@tutorify/shared';

class ReportQueryDto {
  readonly q?: string;
  readonly order?: ReportOrderBy;
  readonly reportType?: ReportType;
}

interface ReportQueryDto extends PaginationDto, SortingDirectionDto {}
applyMixins(ReportQueryDto, [PaginationDto, SortingDirectionDto]);

export { ReportQueryDto };
