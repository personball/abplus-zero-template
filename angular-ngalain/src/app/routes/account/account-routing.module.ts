import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: 'setting', component: AccountSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
// TODO 个人设置（编辑资料，上传头像）
// TODO 菜单管理, 文本\图标\权限\设置快捷菜单
