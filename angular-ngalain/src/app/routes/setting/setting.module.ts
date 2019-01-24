import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SettingRoutingModule } from './setting-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

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
