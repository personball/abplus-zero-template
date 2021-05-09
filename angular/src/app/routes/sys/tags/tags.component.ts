import { Component, Injector, ViewChild } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STChange } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { PagedRequestDto, PagedListingComponentBase } from '@shared/component-base/paged-listing-component-base';
import { TagDtoPagedResultDto, TagServiceProxy, TagDto, TagType } from '@shared/service-proxies/service-proxies';
import { SysTagsCreateComponent } from './create/create.component';
import { SysTagsEditComponent } from './edit/edit.component';

class PagedTagRequestDto extends PagedRequestDto {
  tagType: TagType;
}

@Component({
  selector: 'app-sys-tags',
  templateUrl: './tags.component.html',
})
export class SysTagsComponent extends PagedListingComponentBase<TagDto> {
  items: any[]; // 赋[]会导致init时没有loading效果
  searchSchema: SFSchema = {
    properties: {
      tagType: {
        'type': 'string',
        'title': '标签类型',
        enum: [
          { label: '全部', value: '' },
          { label: '会员标签', value: 'MemberUser' }],
        default: '',
        ui: { widget: 'select' }
      }
    }
  };

  columns: STColumn[] = [
    {
      'title': '标签名称',
      'index': 'name'
    },
    {
      'title': '标签类型',
      'index': 'type',
      format: item => this.l('TagType_' + item.type)
    },
    {
      'title': '颜色',
      'index': 'color'
    },
    {
      'title': '创建时间',
      'index': 'creationTime',
      'type': 'date'
    },
    {
      title: this.l('Actions'),
      buttons: [
        {
          text: '编辑',
          type: 'static',
          component: SysTagsEditComponent,
          params: (item: any) => ({ record: item }),
          click: (r, m, i) => this.refresh()
        },
        {
          text: '删除',
          pop: true,
          popTitle: '确定删除？',
          click: (item: any) => {
            this.delete(item);
            this.refresh();
          }
        }
      ]
    }
  ];

  constructor(
    private injector: Injector,
    private tagService: TagServiceProxy,
    private modal: ModalHelper,
  ) {
    super(injector);
  }

  add() {
    this.modal
      .createStatic(SysTagsCreateComponent)
      .subscribe(() => this.refresh()); // this.st.reload()无法刷新数据，因为是通过属性绑定的，不是st自己请求的
  }

  protected list(
    request: PagedTagRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {

    _.merge(request, this.filter);

    this.tagService
      .getAll(request.tagType, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: TagDtoPagedResultDto) => {
        this.items = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  protected delete(entity: TagDto): void {
    this.tagService.delete(entity.id).subscribe(() => this.refresh());
  }
}
