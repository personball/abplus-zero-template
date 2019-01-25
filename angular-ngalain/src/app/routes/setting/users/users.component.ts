import { Component, ViewChild, Injector } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { PagedResultDtoOfUserDto, UserServiceProxy, UserDto } from '@shared/service-proxies/service-proxies';
import { PagedRequestDto, PagedListingComponentBase } from '@shared/component-base/paged-listing-component-base';
import { Moment } from 'moment';
import * as moment from 'moment';
import { SettingUsersEditComponent } from './edit/edit.component';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';

class PagedUsersRequestDto extends PagedRequestDto {
  userName: string;
  name: string;
  isActive: boolean | null;
  from: Moment | null;
  to: Moment | null;
}

@Component({
  selector: 'app-setting-users',
  templateUrl: './users.component.html',
})
export class SettingUsersComponent extends PagedListingComponentBase<UserDto> {
  items: any[] = [];
  filter: any;
  searchSchema: SFSchema = {
    properties: {
      userName: {
        type: 'string',
        title: '用户名'
      },
      name: {
        type: 'string',
        title: '名字'
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

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '全名', index: 'fullName' },
    { title: '名字', index: 'name' },
    { title: '用户名', index: 'userName' },
    { title: '创建时间', type: 'date', index: 'creationTime' },
    {
      title: this.l('Actions'),
      buttons: [
        { text: '查看', click: (item: any) => console.log(item) }, // `/form/${item.id}`
        { text: '编辑', type: 'static', component: SettingUsersEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(
    _injector: Injector,
    private _userService: UserServiceProxy,
    private modal: ModalHelper) {
    super(_injector);
  }

  query(event: any) {
    this.st.reset(event);
    this.filter = event;
    this.getDataPage(1); // getDataPage 新建了一个requestDto并把页码赋进去了
  }

  add() {
    this.modal
      .createStatic(SettingUsersEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

  protected list(
    request: PagedUsersRequestDto,
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

    this._userService
      .getAll(request.userName, request.name, request.isActive, request.from, request.to, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PagedResultDtoOfUserDto) => {
        this.items = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  protected delete(entity: UserDto): void {
    throw new Error('Method not implemented.');
  }
}
