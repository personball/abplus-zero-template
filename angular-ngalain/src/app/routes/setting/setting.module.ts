import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingUsersComponent } from './users/users.component';
import { SettingUsersEditComponent } from './users/edit/edit.component';
import { SettingUsersViewComponent } from './users/view/view.component';

const COMPONENTS = [
  SettingUsersComponent];
const COMPONENTS_NOROUNT = [
  SettingUsersEditComponent,
  SettingUsersViewComponent];

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
