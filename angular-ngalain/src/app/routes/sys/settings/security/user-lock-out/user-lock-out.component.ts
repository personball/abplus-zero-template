import { Component, OnInit, Injector } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { ConfigurationServiceProxy, UserLockOutSettingsDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-sys-settings-security-user-lock-out',
  templateUrl: './user-lock-out.component.html',
})
export class SysSettingsSecurityUserLockOutComponent extends AppComponentBase implements OnInit {
  record: any = {};
  i: any;
  loading: boolean = false;
  schema: SFSchema = {
    properties: {
      isEnabled: { type: 'boolean', title: '启用用户锁定' },
      maxFailedAccessAttemptsBeforeLockout: { type: 'number', title: '最多输错密码次数', minimum: 3, maximum: 99 },
      defaultAccountLockoutSeconds: { type: 'number', title: '锁定时间(秒)', minimum: 300, maximum: 1800, multipleOf: 60 }
    }
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 200,
      grid: { span: 24 },
    }
  };
  marks: any = {
    300: '5分钟',
    600: '10分钟',
    900: '15分钟',
    1200: '20分钟',
    1500: '25分钟',
    1800: '30分钟'
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
    let entity = UserLockOutSettingsDto.fromJS(value);
    this.configService.updateUserLockoutSettings(entity).subscribe(() => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(value); // this.modal.close(value); 可以传值给list组件
    });
  }

  close() {
    this.modal.destroy();
  }
}
