import { Component, Injector, ViewChild } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { PagedRequestDto, PagedListingComponentBase } from '@shared/component-base/paged-listing-component-base';
import { TenantDtoPagedResultDto, TenantServiceProxy, TenantDto } from '@shared/service-proxies/service-proxies';
import { SysTenantsCreateComponent } from './create/create.component';
import { SysTenantsEditComponent } from './edit/edit.component';

class PagedTenantsRequestDto extends PagedRequestDto {
  tenancyName: string;
  name: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-sys-tenants',
  templateUrl: './tenants.component.html',
})
export class SysTenantsComponent extends PagedListingComponentBase<TenantDto> {
  items: any[];

  searchSchema: SFSchema = {
    properties: {
      tenancyName: {
        type: 'string',
        title: '租户标识'
      },
      name: {
        type: 'string',
        title: '租户名称'
      },
      isActive: {
        type: 'string',
        title: '是否启用',
        enum: [
          { label: '全部', value: '' },
          { label: '是', value: 'true' },
          { label: '否', value: 'false' }
        ],
        default: '',
        ui: {
          widget: 'select'
        }
      }
    }
  };

  columns: STColumn[] = [
    { title: '租户标识', index: 'tenancyName' }, // this.l('pages.sys.tenants.list.fullName')
    { title: '租户名称', index: 'name' },
    {
      title: '是否启用',
      index: 'isActive',
      type: 'badge',
      badge: { true: { text: '已启用', color: 'success' }, false: { text: '未启用', color: 'default' } }
    },
    {
      title: this.l('Actions'),
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // reload is function name in st
        // tslint:disable-next-line:max-line-length
        {
          text: '编辑',
          type: 'static',
          component: SysTenantsEditComponent,
          params: (item: any) => ({ record: item }),
          click: (r, m, i) => this.refresh()
        }
      ]
    }
  ];

  constructor(
    _injector: Injector,
    private tenantService: TenantServiceProxy,
    private modal: ModalHelper) {
    super(_injector);
  }

  add() {
    this.modal
      .createStatic(SysTenantsCreateComponent)
      .subscribe(() => this.refresh()); // this.st.reload()无法刷新数据，因为是通过属性绑定的，不是st自己请求的
  }

  protected list(
    request: PagedTenantsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {

    _.merge(request, this.filter);

    this.tenantService
      .getAll(request.tenancyName, request.name, request.isActive, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: TenantDtoPagedResultDto) => {
        this.items = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  protected delete(entity: TenantDto): void {
    // TODO 删除租户?禁用租户?
    throw new Error('Method not implemented.');
  }
}
