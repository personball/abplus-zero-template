import { Component, OnInit, Injector } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { ConfigurationServiceProxy, PasswordComplexitySettingsDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-sys-settings-security-password-complex',
  templateUrl: './password-complex.component.html',
})
export class SysSettingsSecurityPasswordComplexComponent extends AppComponentBase implements OnInit {
  record: any = {};
  i: any;
  loading: boolean = false;
  schema: SFSchema = {
    properties: {
      requireDigit: { type: 'boolean', title: '包含数字' },
      requireNonAlphanumeric: { type: 'boolean', title: '包含特殊字符' },
      requireLowercase: { type: 'boolean', title: '包含小写字母' },
      requireUppercase: { type: 'boolean', title: '包含大写字母' },
      requiredLength: { type: 'number', title: '密码长度至少', minimum: 6, maximum: 20 }
    }
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 200,
      grid: { span: 24 },
    }
  };

  constructor(
    private modal: NzModalRef,
    private injector: Injector,
    private msgSrv: NzMessageService,
    private configService: ConfigurationServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.i = this.record;
  }

  save(value: any) {
    this.loading = true;
    let entity = PasswordComplexitySettingsDto.fromJS(value);
    this.configService.updatePasswordComplexitySettings(entity).subscribe(() => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(value); // this.modal.close(value); 可以传值给list组件
    });
  }

  close() {
    this.modal.destroy();
  }
}
