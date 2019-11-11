import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { TagServiceProxy, TagDto } from '@shared/service-proxies/service-proxies';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sys-tags-edit',
  templateUrl: './edit.component.html',
})
export class SysTagsEditComponent extends AppComponentBase implements OnInit {
  record: any = {};
  i: any;
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
    }
  };

  constructor(
    private modal: NzModalRef,
    private injector: Injector,
    private msgSrv: NzMessageService,
    private tagService: TagServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.loading = true;
      this.tagService.get(this.record.id).subscribe(res => {
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
    let tag = TagDto.fromJS(value);
    this.tagService.update(tag).subscribe(() => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(true); // this.modal.close(value); 可以传值给list组件
    });
  }

  close() {
    this.modal.destroy();
  }
}
