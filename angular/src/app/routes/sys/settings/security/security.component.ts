import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import {
  ConfigurationServiceProxy, SecuritySettingsDto,
  UserLockOutSettingsDto, PasswordComplexitySettingsDto, TwoFactorLoginSettingsDto, EmailConfirmationSettingDto
} from '@shared/service-proxies/service-proxies';
import { ModalHelper } from '@delon/theme';
import { SysSettingsSecurityPasswordComplexComponent } from './password-complex/password-complex.component';
import { SysSettingsSecurityUserLockOutComponent } from './user-lock-out/user-lock-out.component';
import { SysSettingsSecurityTwoFactorLoginComponent } from './two-factor-login/two-factor-login.component';

@Component({
  selector: 'app-sys-settings-security',
  templateUrl: './security.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SysSettingsSecurityComponent implements OnInit {
  loading = false;
  switchLoading = false;
  i: SecuritySettingsDto = <SecuritySettingsDto>{
    isEmailConfirmationRequiredForLogin: false,
    userLockOut: new UserLockOutSettingsDto(),
    passwordComplexity: new PasswordComplexitySettingsDto(),
    twoFactorLogin: new TwoFactorLoginSettingsDto()
  };

  constructor(
    private configService: ConfigurationServiceProxy,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService,
    private modal: ModalHelper) { }

  ngOnInit() {
    this.loading = true;
    this.switchLoading = true;
    this.configService.getSecuritySettings()
      .subscribe(res => {
        this.loading = false;
        this.switchLoading = false;
        this.i = res;
        this.cdr.detectChanges();
      }, (err) => {
        this.loading = false;
        this.switchLoading = false;
        this.cdr.detectChanges();
      });
  }

  emailSettingSwitch() {
    this.switchLoading = true;
    let input = new EmailConfirmationSettingDto();
    input.isEmailConfirmationRequiredForLogin = !this.i.isEmailConfirmationRequiredForLogin;
    this.configService.updateEmailConfirmationSetting(input).subscribe(res => {
      this.i.isEmailConfirmationRequiredForLogin = input.isEmailConfirmationRequiredForLogin;
      this.switchLoading = false;
      this.cdr.detectChanges();
    }, (err) => {
      this.switchLoading = false;
      this.cdr.detectChanges();
    });
  }

  setPassword(setting: PasswordComplexitySettingsDto) {
    this.modal
      .createStatic(SysSettingsSecurityPasswordComplexComponent, { record: setting }, { size: 'md' })
      .subscribe((res: PasswordComplexitySettingsDto) => {
        this.i.passwordComplexity = res;
        this.cdr.detectChanges();
      });
  }

  setUserLockOut(setting: UserLockOutSettingsDto) {
    this.modal
      .createStatic(SysSettingsSecurityUserLockOutComponent, { record: setting }, { size: 'md' })
      .subscribe((res: UserLockOutSettingsDto) => {
        this.i.userLockOut = res;
        this.cdr.detectChanges();
      });
  }

  setTwoFactorLogin(setting: TwoFactorLoginSettingsDto) {
    this.modal
      .createStatic(SysSettingsSecurityTwoFactorLoginComponent, { record: setting }, { size: 'md' })
      .subscribe((res: TwoFactorLoginSettingsDto) => {
        this.i.twoFactorLogin = res;
        this.cdr.detectChanges();
      });
  }
}
