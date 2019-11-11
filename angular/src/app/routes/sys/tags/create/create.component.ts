import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema, FormProperty, PropertyGroup } from '@delon/form';
import { TagServiceProxy, TagDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sys-tags-create',
  templateUrl: './create.component.html',
})
export class SysTagsCreateComponent extends AppComponentBase {
  record: any = {};
  loading: boolean = false;

  schema: SFSchema = {
    'properties': {
      'name': {
        'title': '标签名称',
        'type': 'string',
        'maxLength': 32
      },
      'type': {
        'title': '标签类型',
        'type': 'string',
        enum: [{ label: '会员标签', value: 'MemberUser' }],
        ui: { widget: 'select', default: '', placeholder: '请选择' }
      },
      'description': {
        'title': '标签描述',
        'type': 'string',
        'maxLength': 256
      },
      'color': {
        'title': '颜色',
        'type': 'string',
        'maxLength': 6
      }
    }
  };

  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
      order: [
        'name',
        'type',
        'description',
        'color'
      ]
    },
    // $no: {
    //   widget: 'text'
    // },
    // $href: {
    //   widget: 'string',
    // },
    // $description: {
    //   widget: 'textarea',
    //   grid: { span: 24 },
    // },
  };

  constructor(
    private modal: NzModalRef,
    private injector: Injector,
    private msgSrv: NzMessageService,
    private tagService: TagServiceProxy
  ) {
    super(injector);
  }

  save(value: any) {
    if (!value) {
      this.modal.close(true);
      return;
    }
    this.loading = true;
    let tag = TagDto.fromJS(value);
    this.tagService.create(tag).subscribe(res => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(true); // this.modal.close(value); 可以传值给list组件
    });
  }

  close() {
    this.modal.destroy();
  }
}
