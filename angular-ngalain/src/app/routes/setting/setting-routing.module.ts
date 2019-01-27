import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingUsersComponent } from './users/users.component';
import { SettingTenantsComponent } from './tenants/tenants.component';
import { SettingRolesComponent } from './roles/roles.component';

// 本模块相对路径
const routes: Routes = [

  { path: 'users', component: SettingUsersComponent },
  { path: 'tenants', component: SettingTenantsComponent },
  { path: 'roles', component: SettingRolesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
