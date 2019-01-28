import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './settings/settings.component';
import { AccountSettingsBaseComponent } from './settings/base/base.component';

const routes: Routes = [
  {
    path: 'settings',
    component: AccountSettingsComponent,
    children: [
      { path: '', redirectTo: 'base', pathMatch: 'full' },
      {
        path: 'base',
        component: AccountSettingsBaseComponent,
        data: { titleI18n: 'pro-account-settings' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
// TODO 个人设置（编辑资料，上传头像）
// TODO 菜单管理, 文本\图标\权限\设置快捷菜单
