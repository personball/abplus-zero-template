import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { CategoryServiceProxy, CategoryDto } from '@shared/service-proxies/service-proxies';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sys-categories-edit',
  templateUrl: './edit.component.html',
})
export class SysCategoriesEditComponent extends AppComponentBase implements OnInit {
  record: any = {};
  i: any;
  loading: boolean = false;

  schema: SFSchema = {
    'properties': {
      'name': {
        'title': '分类名称',
        'type': 'string',
        'minLength': 0,
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
        'parentCategoryId',
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

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.loading = true;
      this.categoryService.get(this.record.id).subscribe(res => {
        this.loading = false;
        this.i = res;
      });
    }
  }

  save(value: any) {
    if (!value) {
      this.modal.close(true);
      return;
    }
    this.loading = true;
    let category = CategoryDto.fromJS(value);
    this.categoryService.update(category).subscribe(() => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(true); // this.modal.close(value); 可以传值给list组件
    }, null, () => this.loading = false);
  }

  close() {
    this.modal.destroy();
  }
}
