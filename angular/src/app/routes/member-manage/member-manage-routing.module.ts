import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberManageMembersComponent } from './members/members.component';

const routes: Routes = [
  { path: 'members', component: MemberManageMembersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberManageRoutingModule { }
