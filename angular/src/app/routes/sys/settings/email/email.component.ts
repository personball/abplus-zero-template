import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { ConfigurationServiceProxy, EmailSettingsDto, TestEmailSettingsInput } from '@shared/service-proxies/service-proxies';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-sys-settings-email',
  templateUrl: './email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysSettingsEmailComponent implements OnInit {
  loading = false;
  setting: any;

  schema: SFSchema = {
    properties: {
      defaultFromAddress: { type: 'string', title: '默认发件人', maxLength: 256 },
      defaultFromDisplayName: { type: 'string', title: '默认发件人显示名称', maxLength: 20 },
      smtpHost: { type: 'string', title: 'Smtp Server', maxLength: 64 },
      smtpPort: { type: 'number', title: 'Smtp 端口' },
      smtpEnableSsl: { type: 'boolean', title: '启用SSL' },
      smtpUserName: { type: 'string', title: 'Smtp 账号' },
      smtpPassword: { type: 'string', title: 'Smtp 密码', ui: { type: 'password' } },
      testReceiver: { type: 'string', title: '测试邮件收件人' }
    }
  };

  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 150,
      grid: { offset: 3, span: 12 },
    }
  };

  constructor(
    private configuartionService: ConfigurationServiceProxy,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.configuartionService.getEmailSettings()
      .subscribe(res => {
        this.loading = false;
        this.setting = res;
        this.cdr.detectChanges();
      }, (err) => {
        this.loading = false;
        this.cdr.detectChanges();
      });
  }
  save(value: any) {
    this.loading = true;
    let settings = EmailSettingsDto.fromJS(value);
    this.configuartionService.updateEmailSettings(settings).subscribe(res => {
      this.loading = false;
      this.msg.success('保存成功！');
      this.cdr.detectChanges();
    });
  }
  test(value: any) {
    if (!value.testReceiver) {
      this.msg.error('请填写测试邮件收件人!');
      return;
    }

    this.loading = true;
    let input = new TestEmailSettingsInput();
    input.to = value.testReceiver;
    this.configuartionService.testEmailSettings(input)
      .subscribe(res => {
        this.loading = false;
        this.msg.success('测试邮件发送成功！');
        this.cdr.detectChanges();
      }, (err) => {
        this.loading = false;
        this.msg.error(err);
        this.cdr.detectChanges();
      });
  }
}
