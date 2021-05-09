import { Component, Injector, ViewChild } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { PagedRequestDto, PagedListingComponentBase } from '@shared/component-base/paged-listing-component-base';
import { RoleDtoPagedResultDto, RoleServiceProxy, RoleDto } from '@shared/service-proxies/service-proxies';
import { SysRolesCreateComponent } from './create/create.component';
import { SysRolesEditComponent } from './edit/edit.component';

class PagedRolesRequestDto extends PagedRequestDto {
  roleName: string;
  displayName: string;
  description: string;
}

@Component({
  selector: 'app-sys-roles',
  templateUrl: './roles.component.html',
})
export class SysRolesComponent extends PagedListingComponentBase<RoleDto> {
  items: any[];

  searchSchema: SFSchema = {
    properties: {
      roleName: {
        type: 'string',
        title: '角色名'
      },
      displayName: {
        type: 'string',
        title: '展示名'
      },
      description: {
        type: 'string',
        title: '描述'
      }
    }
  };

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '角色名', index: 'name' },
    { title: '展示名', index: 'displayName' }, // this.l('pages.sys.roles.list.fullName')
    { title: '描述', index: 'description' },
    { title: '是否默认', index: 'isDefault', type: 'yn' },
    { title: '是否内置', index: 'isStatic', type: 'yn' },
    {
      title: this.l('Actions'),
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        {
          text: '编辑',
          type: 'static',
          component: SysRolesEditComponent,
          params: (item: any) => ({ record: item }),
          click: (r, m, i) => this.refresh()
        },
      ]
    }
  ];

  constructor(
    injector: Injector,
    private rolesService: RoleServiceProxy,
    private modal: ModalHelper) {
    super(injector);
  }

  add() {
    this.modal
      .createStatic(SysRolesCreateComponent)
      .subscribe(() => this.refresh()); // this.st.reload()无法刷新数据，因为是通过属性绑定的，不是st自己请求的
  }

  protected list(
    request: PagedRolesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {

    _.merge(request, this.filter);

    this.rolesService
      .getAll(request.roleName, request.displayName, request.description, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: RoleDtoPagedResultDto) => {
        this.items = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  protected delete(entity: RoleDto): void {
    // TODO 是否可以删除内置角色?
    throw new Error('Method not implemented.');
  }
}
