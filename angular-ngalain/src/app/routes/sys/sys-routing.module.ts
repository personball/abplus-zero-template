import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysUsersComponent } from './users/users.component';
import { SysRolesComponent } from './roles/roles.component';
import { SysTenantsComponent } from './tenants/tenants.component';

const routes: Routes = [

  { path: 'users', component: SysUsersComponent },
  { path: 'roles', component: SysRolesComponent },
  { path: 'tenants', component: SysTenantsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
