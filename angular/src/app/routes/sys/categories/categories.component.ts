import { Component, Injector, ViewChild } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STChange } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as _ from 'lodash';
import { finalize, map } from 'rxjs/operators';
import { PagedRequestDto, PagedListingComponentBase } from '@shared/component-base/paged-listing-component-base';
import {
  PagedResultDtoOfCategoryDto
  , CategoryServiceProxy, CategoryDto
} from '@shared/service-proxies/service-proxies';
import { SysCategoriesCreateComponent } from './create/create.component';
import { SysCategoriesEditComponent } from './edit/edit.component';

class PagedCategoryRequestDto extends PagedRequestDto {
  keyword: string;
  parentCategoryId: number;
  onlyRoot: boolean | null;
}

@Component({
  selector: 'app-sys-categories',
  templateUrl: './categories.component.html',
})
export class SysCategoriesComponent extends PagedListingComponentBase<CategoryDto> {
  items: any[]; // 赋[]会导致init时没有loading效果
  searchSchema: SFSchema = {
    properties: {
      keyword: {
        'type': 'string',
        'title': '关键词'
      },
      parentCategoryId: {
        'type': 'number',
        'title': '父分类',
        default: '',
        ui: {
          widget: 'select',
          asyncData: () => this.categoryService.getAll('', undefined, true, 0, 100).pipe(map(res => {
            let items = [{ label: '不限', value: '' }];
            res.items.map(i => items.push({ label: i.name, value: `${i.id}` }));
            return items;
          }))
        }
      },
      onlyRoot: {
        'type': 'boolean',
        'title': '只看父分类'
      }
    }
  };

  columns: STColumn[] = [
    {
      'title': '父分类',
      'index': 'parentCategoryName'
    },
    {
      'title': '分类名称',
      'index': 'name'
    },
    {
      'title': '创建时间',
      'index': 'creationTime',
      'type': 'date'
    },
    {
      title: this.l('Actions'),
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        {
          text: '编辑',
          type: 'static',
          component: SysCategoriesEditComponent,
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
    private categoryService: CategoryServiceProxy,
    private modal: ModalHelper,
  ) {
    super(injector);
  }

  add() {
    this.modal
      .createStatic(SysCategoriesCreateComponent)
      .subscribe(() => this.refresh()); // this.st.reload()无法刷新数据，因为是通过属性绑定的，不是st自己请求的
  }

  protected list(
    request: PagedCategoryRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {

    _.merge(request, this.filter);

    this.categoryService
      .getAll(request.keyword, request.parentCategoryId, request.onlyRoot, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PagedResultDtoOfCategoryDto) => {
        this.items = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  protected delete(entity: CategoryDto): void {
    this.categoryService.delete(entity.id).subscribe(() => this.refresh());
  }
}
