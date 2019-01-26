import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountCenterComponent } from './center/center.component';
import { AccountSettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: 'center', component: AccountCenterComponent },
  { path: 'setting', component: AccountSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
// TODO 个人中心
// TODO 个人设置
