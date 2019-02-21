import { Component } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent {

  constructor(
    public settingsSrv: SettingsService
  ) {
    console.log(settingsSrv.app.description);
  }

  year: number = new Date().getFullYear();
  links = [
    {
      title: '帮助',
      href: '',
    },
    {
      title: '隐私',
      href: '',
    },
    {
      title: '条款',
      href: '',
    },
  ];
}
