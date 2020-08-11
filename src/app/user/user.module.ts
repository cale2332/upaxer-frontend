import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './pages/user-detail/user-detail.component'

import {  SharedModule } from "../shared/shared.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'UserDetail/:userId', component: UserDetailComponent },
      { path: '**', redirectTo: '404', pathMatch: 'full' }
    ]),
    SharedModule,
    TranslateModule
  ],
  exports: [
    UserDetailComponent 
  ]
})
export class UserModule { }
