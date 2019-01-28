import { Component, OnInit, Injector } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { TenantServiceProxy, TenantDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-sys-tenants-edit',
  templateUrl: './edit.component.html',
})
export class SysTenantsEditComponent extends AppComponentBase implements OnInit {
  record: any = {};
  i: any;
  loading: boolean = false;
  schema: SFSchema = {
    properties: {
      tenancyName: { type: 'string', title: '租户标识', maxLength: 256 },
      name: { type: 'string', title: '租户名称', maxLength: 64 },
      isActive: { type: 'boolean', title: '是否启用' }
    },
    required: ['tenancyName', 'name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    }
  };

  constructor(
    private modal: NzModalRef,
    injector: Injector,
    private msgSrv: NzMessageService,
    private tenantService: TenantServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.loading = true;
      this.tenantService.get(this.record.id).subscribe(res => {
        this.loading = false;
        this.i = res;
      });
    }
  }

  save(value: any) {
    this.loading = true;
    let entity = TenantDto.fromJS(value);
    this.tenantService.update(entity).subscribe(() => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(true); // this.modal.close(value); 可以传值给list组件
    });
  }

  close() {
    this.modal.destroy();
  }
}
