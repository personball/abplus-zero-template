import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingUsersComponent } from './users/users.component';
import { SettingRolesComponent } from './roles/roles.component';
import { SettingTenantsComponent } from './tenants/tenants.component';

// 本模块相对路径
const routes: Routes = [

  { path: 'users', component: SettingUsersComponent },
  { path: 'roles', component: SettingRolesComponent },
  { path: 'tenants', component: SettingTenantsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
