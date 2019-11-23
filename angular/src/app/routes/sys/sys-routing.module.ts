import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysUsersComponent } from './users/users.component';
import { SysRolesComponent } from './roles/roles.component';
import { SysTenantsComponent } from './tenants/tenants.component';
import { SysAuditLogsComponent } from './audit-logs/audit-logs.component';
import { SysSettingsComponent } from './settings/settings.component';
import { SysSettingsEmailComponent } from './settings/email/email.component';
import { SysSettingsSecurityComponent } from './settings/security/security.component';
import { SysTagsComponent } from './tags/tags.component';
import { SysCategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: 'users', component: SysUsersComponent },
  { path: 'roles', component: SysRolesComponent },
  { path: 'tenants', component: SysTenantsComponent },
  { path: 'audit-logs', component: SysAuditLogsComponent },
  {
    path: 'settings',
    component: SysSettingsComponent,
    children: [
      { path: '', redirectTo: 'email', pathMatch: 'full' },
      { path: 'email', component: SysSettingsEmailComponent },
      { path: 'security', component: SysSettingsSecurityComponent }
    ]
  },
  { path: 'tags', component: SysTagsComponent },
  { path: 'categories', component: SysCategoriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
