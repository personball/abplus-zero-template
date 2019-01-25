import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingUsersComponent } from './users/users.component';
import { SettingUsersEditComponent } from './users/edit/edit.component';
import { SettingUsersViewComponent } from './users/view/view.component';
import { SettingRolesComponent } from './roles/roles.component';
import { SettingRolesEditComponent } from './roles/edit/edit.component';
import { SettingRolesViewComponent } from './roles/view/view.component';
import { SettingTenantsComponent } from './tenants/tenants.component';
import { SettingTenantsEditComponent } from './tenants/edit/edit.component';
import { SettingTenantsViewComponent } from './tenants/view/view.component';

const COMPONENTS = [
  SettingUsersComponent,
  SettingRolesComponent,
  SettingTenantsComponent];
const COMPONENTS_NOROUNT = [
  SettingUsersEditComponent,
  SettingUsersViewComponent,
  SettingRolesEditComponent,
  SettingRolesViewComponent,
  SettingTenantsEditComponent,
  SettingTenantsViewComponent];

@NgModule({
  imports: [
    SharedModule,
    SettingRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SettingModule { }
