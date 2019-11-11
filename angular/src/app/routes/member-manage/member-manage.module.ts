import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MemberManageRoutingModule } from './member-manage-routing.module';
import { MemberManageMembersComponent } from './members/members.component';
import { MemberManageMembersSetTagsComponent } from './members/set-tags/set-tags.component';

const COMPONENTS = [
  MemberManageMembersComponent];
const COMPONENTS_NOROUNT = [
  MemberManageMembersSetTagsComponent];

@NgModule({
  imports: [
    SharedModule,
    MemberManageRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class MemberManageModule { }
