import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AccountRoutingModule } from './account-routing.module';

const COMPONENTS = [];
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
