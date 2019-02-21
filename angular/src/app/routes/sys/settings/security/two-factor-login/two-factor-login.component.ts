import { Component, OnInit, Injector } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { ConfigurationServiceProxy, TwoFactorLoginSettingsDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-sys-settings-security-two-factor-login',
  templateUrl: './two-factor-login.component.html',
})
export class SysSettingsSecurityTwoFactorLoginComponent extends AppComponentBase implements OnInit {
  record: any = {};
  i: any;
  loading: boolean = false;
  schema: SFSchema = {
    properties: {
      isEnabled: { type: 'boolean', title: '启用两步认证' },
      isEmailProviderEnabled: { type: 'boolean', title: '邮箱认证' },
      isSmsProviderEnabled: { type: 'boolean', title: '短信认证' },
      isRememberBrowserEnabled: { type: 'boolean', title: '允许记住浏览器' }
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
    injector: Injector,
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
    let entity = TwoFactorLoginSettingsDto.fromJS(value);
    this.configService.updateTwoFactorLoginSettings(entity).subscribe(() => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(value); // this.modal.close(value); 可以传值给list组件
    });
  }

  close() {
    this.modal.destroy();
  }
}
