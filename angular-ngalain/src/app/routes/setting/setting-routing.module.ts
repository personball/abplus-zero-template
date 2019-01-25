import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingUsersComponent } from './users/users.component';

// 本模块相对路径
const routes: Routes = [

  { path: 'users', component: SettingUsersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
