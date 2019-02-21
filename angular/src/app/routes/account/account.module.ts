import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AccountRoutingModule } from './account-routing.module';
import { AccountSettingsComponent } from './settings/settings.component';
import { AccountSettingsBaseComponent } from './settings/base/base.component';

const COMPONENTS = [
  AccountSettingsComponent,
  AccountSettingsBaseComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AccountModule { }
