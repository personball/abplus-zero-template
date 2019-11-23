import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema, FormProperty, PropertyGroup } from '@delon/form';
import { CategoryServiceProxy, CreateCategoryDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sys-categories-create',
  templateUrl: './create.component.html',
})
export class SysCategoriesCreateComponent extends AppComponentBase {
  record: any = {};
  loading: boolean = false;

  schema: SFSchema = {
    'properties': {
      'name': {
        'title': '分类名称',
        'type': 'string',
        'maxLength': 64
      },
      parentCategoryId: {
        'type': 'number',
        'title': '父分类',
        default: '',
        ui: {
          widget: 'select',
          asyncData: () => this.categoryService.getAll('', undefined, true, 0, 100).pipe(map(res => {
            let items = [{ label: '无', value: '' }];
            res.items.map(i => items.push({ label: i.name, value: `${i.id}` }));
            return items;
          }))
        }
      },
    }
  };

  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
      order: [
        'name',
        'parentCategoryId'
      ]
    }
  };

  constructor(
    private modal: NzModalRef,
    private injector: Injector,
    private msgSrv: NzMessageService,
    private categoryService: CategoryServiceProxy
  ) {
    super(injector);
  }

  save(value: any) {
    if (!value) {
      this.modal.close(true);
      return;
    }
    this.loading = true;
    let category = CreateCategoryDto.fromJS(value);
    this.categoryService.create(category).subscribe(res => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(true); // this.modal.close(value); 可以传值给list组件
    }, null, () => this.loading = false);
  }

  close() {
    this.modal.destroy();
  }
}
