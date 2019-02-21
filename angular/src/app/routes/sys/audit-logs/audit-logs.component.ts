import { Component, Injector, ViewChild } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STChange } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { PagedRequestDto, PagedListingComponentBase } from '@shared/component-base/paged-listing-component-base';
import { PagedResultDtoOfAuditLogDto, AuditLogServiceProxy, AuditLogDto } from '@shared/service-proxies/service-proxies';
import { SysAuditLogsDetailComponent } from './detail/detail.component';

class PagedAuditLogRequestDto extends PagedRequestDto {
  exeDurationGreaterThan: number;
  exeDurationLessThan: number;
  serviceName: string;
  methodName: string;
  from: Moment | null;
  to: Moment | null;
}

@Component({
  selector: 'app-sys-audit-logs',
  templateUrl: './audit-logs.component.html',
})
export class SysAuditLogsComponent extends PagedListingComponentBase<AuditLogDto> {
  items: any[]; // 赋[]会导致init时没有loading效果

  searchSchema: SFSchema = {
    properties: {
      serviceName: {
        type: 'string',
        title: '服务名'
      },
      methodName: {
        type: 'string',
        title: '方法名'
      },
      exeDurationGreaterThan: {
        type: 'number',
        title: '耗时大于(ms)'
      },
      exeDurationLessThan: {
        type: 'number',
        title: '耗时小于(ms)'
      },
      from: {
        title: this.l('CreationTime'),
        type: 'string',
        format: 'date-time',
        ui: { widget: 'date', end: 'to' }
      },
      to: {
        format: 'date-time',
        type: 'string'
      }
    }
  };

  columns: STColumn[] = [
    { title: '服务名', index: 'serviceName' },
    { title: '方法名', index: 'methodName' }, // this.l('pages.setting.audit-logs.list.fullName')
    { title: '耗时(ms)', index: 'executionDuration' },
    {
      title: '是否异常',
      index: 'hasException',
      type: 'badge',
      badge: { true: { text: '有异常', color: 'error' }, false: { text: '无异常', color: 'success' } }
    },
    { title: '执行时间', type: 'date', index: 'executionTime' },
    {
      title: this.l('Actions'),
      buttons: [
        {
          text: '详情', type: 'static',
          component: SysAuditLogsDetailComponent,
          params: (item: any) => ({ record: item })
        }
      ]
    }
  ];

  constructor(
    private injector: Injector,
    private auditLogService: AuditLogServiceProxy,
    private modal: ModalHelper,
  ) {
    super(injector);
  }

  protected list(
    request: PagedAuditLogRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {

    _.merge(request, this.filter);

    if (this.filter && this.filter.from) {
      request.from = moment(this.filter.from);
    }
    if (this.filter && this.filter.to) {
      request.to = moment(this.filter.to);
    }

    this.auditLogService
      .getAll(
        request.exeDurationGreaterThan,
        request.exeDurationLessThan,
        request.methodName,
        request.serviceName,
        request.from,
        request.to,
        request.skipCount,
        request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PagedResultDtoOfAuditLogDto) => {
        this.items = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: AuditLogDto): void {
    throw new Error('Method not implemented.');
  }
}
