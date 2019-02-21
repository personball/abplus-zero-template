import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService, ModalHelper } from '@delon/theme';
import { HeaderChangePwdComponent } from '../header/components/change-pwd.component';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  constructor(
    private _modal: ModalHelper,
    public settings: SettingsService) {}

  openChangePwd() {
    this._modal
      .createStatic(HeaderChangePwdComponent)
      .subscribe();
  }
}
