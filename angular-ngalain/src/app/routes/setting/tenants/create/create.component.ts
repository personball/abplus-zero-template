import { Component, Injector } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { TenantServiceProxy, CreateTenantDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/component-base/app-component-base';

@Component({
  selector: 'app-setting-tenants-create',
  templateUrl: './create.component.html',
})
export class SettingTenantsCreateComponent extends AppComponentBase {
  record: any = {};
  loading: boolean = false;
  schema: SFSchema = {
    properties: {
      tenancyName: { type: 'string', title: '租户标识', maxLength: 256 },
      name: { type: 'string', title: '租户名称', maxLength: 64 },
      adminEmailAddress: { type: 'string', format: 'email', title: '管理员邮箱地址', maxLength: 256 },
      connectionString: { type: 'string', title: '数据库连接字符串', maxLength: 1024 },
      isActive: { type: 'boolean', title: '是否启用' }
    },
    required: ['tenancyName', 'name', 'adminEmailAddress'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { offset: 6, span: 12 },
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

  save(value: any) {
    this.loading = true;
    let entity = CreateTenantDto.fromJS(value);
    this.tenantService.create(entity).subscribe(() => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(true); // this.modal.close(value); 可以传值给list组件
    });
  }

  close() {
    this.modal.destroy();
  }
}
