import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 本模块相对路径
const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
