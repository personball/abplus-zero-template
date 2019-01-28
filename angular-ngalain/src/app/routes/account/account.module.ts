import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AccountRoutingModule } from './account-routing.module';
import { AccountSettingComponent } from './setting/setting.component';

const COMPONENTS = [
  AccountSettingComponent];
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
