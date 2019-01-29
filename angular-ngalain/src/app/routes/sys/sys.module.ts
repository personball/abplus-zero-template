import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysRoutingModule } from './sys-routing.module';
import { SysUsersComponent } from './users/users.component';
import { SysUsersEditComponent } from './users/edit/edit.component';
import { SysRolesComponent } from './roles/roles.component';
import { SysRolesEditComponent } from './roles/edit/edit.component';
import { SysTenantsComponent } from './tenants/tenants.component';
import { SysTenantsEditComponent } from './tenants/edit/edit.component';
import { SysUsersCreateComponent } from './users/create/create.component';
import { SysRolesCreateComponent } from './roles/create/create.component';
import { SysTenantsCreateComponent } from './tenants/create/create.component';
import { SysAuditLogsComponent } from './audit-logs/audit-logs.component';
import { SysSettingsComponent } from './settings/settings.component';
import { SysSettingsEmailComponent } from './settings/email/email.component';

const COMPONENTS = [
  SysUsersComponent,
  SysRolesComponent,
  SysTenantsComponent,
  SysAuditLogsComponent,
  SysSettingsComponent,
  SysSettingsEmailComponent];
const COMPONENTS_NOROUNT = [
  SysUsersEditComponent,
  SysRolesEditComponent,
  SysTenantsEditComponent,
  SysUsersCreateComponent,
  SysRolesCreateComponent,
  SysTenantsCreateComponent];

@NgModule({
  imports: [
    SharedModule,
    SysRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SysModule { }
