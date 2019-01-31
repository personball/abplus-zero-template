import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SFUISchema, SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { ConfigurationServiceProxy, SecuritySettingsDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-sys-settings-security',
  templateUrl: './security.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SysSettingsSecurityComponent implements OnInit {
  loading = false;
  i: SecuritySettingsDto = new SecuritySettingsDto();
  // schema: SFSchema = {
  //   properties: {
  //     isEmailConfirmationRequiredForLogin: { type: 'boolean', title: '是否启用邮件激活' },

  //     userLockOutIsEnabled: { type: 'boolean', title: '是否启用密码输错后锁定' },
  //     userLockOutMaxFailedAccessAttemptsBeforeLockout: { type: 'number', title: '密码最多输错几次' },
  //     userLockOutDefaultAccountLockoutSeconds: { type: 'number', title: '锁定多少时间（秒）' },

  //     twoFactorLoginIsEnabled: { type: 'boolean', title: '是否启用两步验证' },
  //     twoFactorLoginIsEmailProviderEnabled: { type: 'boolean', title: '邮件验证' },
  //     twoFactorLoginIsSmsProviderEnabled: { type: 'boolean', title: '短信验证' },
  //     twoFactorLoginIsRememberBrowserEnabled: { type: 'boolean', title: '浏览器识别' },

  //     passwordComplexityRequiredLength: { type: 'number', title: '密码长度至少' },
  //     passwordComplexityRequireNonAlphanumeric: { type: 'boolean', title: '密码必须包含特殊字符' },
  //     passwordComplexityRequireDigit: { type: 'boolean', title: '密码必须包含数字' },
  //     passwordComplexityRequireLowercase: { type: 'boolean', title: '密码必须包含小写字母' },
  //     passwordComplexityRequireUppercase: { type: 'boolean', title: '密码必须包含大写字母' },
  //   }
  // };

  // ui: SFUISchema = {
  //   '*': {
  //     spanLabelFixed: 200,
  //     grid: { offset: 1, span: 18 },
  //   },
  //   $isEmailConfirmationRequiredForLogin: { grid: { offset: 3, span: 18 } },

  //   $userLockOutIsEnabled: { grid: { offset: 3, span: 18 } },
  //   $userLockOutMaxFailedAccessAttemptsBeforeLockout: {
  //     grid: { offset: 6, span: 18 },
  //     visibleIf: { userLockOutIsEnabled: [true] }
  //   },
  //   $userLockOutDefaultAccountLockoutSeconds: {
  //     grid: { offset: 6, span: 18 },
  //     visibleIf: { userLockOutIsEnabled: [true] }
  //   },

  //   $twoFactorLoginIsEnabled: { grid: { offset: 3, span: 21 } },
  //   $twoFactorLoginIsEmailProviderEnabled: {
  //     grid: { offset: 6, span: 18 },
  //     visibleIf: { twoFactorLoginIsEnabled: [true] }
  //   },
  //   $twoFactorLoginIsSmsProviderEnabled: {
  //     grid: { offset: 6, span: 18 },
  //     visibleIf: { twoFactorLoginIsEnabled: [true] }
  //   },
  //   $twoFactorLoginIsRememberBrowserEnabled: {
  //     grid: { offset: 6, span: 18 },
  //     visibleIf: { twoFactorLoginIsEnabled: [true] }
  //   },

  //   $passwordComplexityRequiredLength: { grid: { offset: 3, span: 18 } },
  //   $passwordComplexityRequireNonAlphanumeric: { grid: { offset: 3, span: 9 }, },
  //   $passwordComplexityRequireDigit: { grid: { span: 12 } },
  //   $passwordComplexityRequireLowercase: { grid: { offset: 3, span: 9 } },
  //   $passwordComplexityRequireUppercase: { grid: { span: 12 } },
  // };

  constructor(
    private configService: ConfigurationServiceProxy,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService) { }

  ngOnInit() {
    this.loading = true;
    this.configService.getSecuritySettings()
      .subscribe(res => {
        this.loading = false;
        this.i = res;
        this.cdr.detectChanges();
      }, (err) => {
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  save() {
    this.loading = true;
    this.configService.updateSecuritySettings(this.i).subscribe(res => {
      this.loading = false;
      this.msg.success('保存成功！');
      this.cdr.detectChanges();
    });
  }

}
