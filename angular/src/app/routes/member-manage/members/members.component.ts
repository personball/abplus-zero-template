import { Component, Injector, ViewChild } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STChange } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { PagedRequestDto, PagedListingComponentBase } from '@shared/component-base/paged-listing-component-base';
import { PagedResultDtoOfMemberUserDto, MemberUserServiceProxy, MemberUserDto } from '@shared/service-proxies/service-proxies';
import { MemberManageMembersSetTagsComponent } from './set-tags/set-tags.component';

class PagedMemberUserRequestDto extends PagedRequestDto {
  keyword: string;
  from: Moment | null;
  to: Moment | null;
}

@Component({
  selector: 'app-member-manage-members',
  templateUrl: './members.component.html',
})
export class MemberManageMembersComponent extends PagedListingComponentBase<MemberUserDto> {
  items: any[]; // 赋[]会导致init时没有loading效果
  searchSchema: SFSchema = {
    properties: {
      keyword: {
        'type': 'string',
        'title': '关键词',
        ui: { placeholder: '昵称' }
      },
      from: {
        'type': 'string',
        'title': '注册时间',
        'format': 'date-time',
        'ui': {
          'widget': 'date',
          'end': 'to'
        }
      },
      to: {
        'format': 'date-time',
        'type': 'string'
      }
    }
  };

  columns: STColumn[] = [
    {
      'title': '昵称',
      'index': 'nickName'
    },
    {
      'title': '头像',
      'index': 'headLogo'
    },
    {
      'title': '性别',
      'index': 'gender',
      format: item => this.l('Gender_' + item.gender)
    },
    {
      'title': '城市',
      'index': 'city'
    },
    {
      'title': '省份',
      'index': 'province'
    },
    {
      'title': '国家',
      'index': 'country'
    },
    {
      'title': '是否启用',
      'index': 'isActive',
      'type': 'badge',
      'badge': {
        'true': {
          'text': '正常',
          'color': 'success'
        },
        'false': {
          'text': '禁用',
          'color': 'default'
        }
      }
    },
    {
      'title': '注册时间',
      'index': 'creationTime',
      'type': 'date'
    },
    {
      title: this.l('Actions'),
      buttons: [
        {
          text: '会员标签',
          type: 'static',
          component: MemberManageMembersSetTagsComponent,
          params: (item: any) => ({ record: item }),
          click: (r, m, i) => this.refresh()
        }
      ]
    }
  ];

  constructor(
    private injector: Injector,
    private memberUserService: MemberUserServiceProxy,
    private modal: ModalHelper,
  ) {
    super(injector);
  }

  add() {
    // this.modal
    //   .createStatic(MemberManageMembersComponentCreateComponent)
    //   .subscribe(() => this.refresh()); // this.st.reload()无法刷新数据，因为是通过属性绑定的，不是st自己请求的
  }

  protected list(
    request: PagedMemberUserRequestDto,
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

    this.memberUserService
      .getAll(request.keyword, request.from, request.to, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PagedResultDtoOfMemberUserDto) => {
        this.items = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  protected delete(entity: MemberUserDto): void {
    // this.memberUserService.delete(entity.id).subscribe(() => this.refresh());
  }
}
