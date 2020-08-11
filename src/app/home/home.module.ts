import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SharedModule } from "../shared/shared.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LogInComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LogInComponent },
      { path: 'LogIn', component: LogInComponent },
      { path: '**', redirectTo: '404', pathMatch: 'full' }
    ]),
    SharedModule,
    TranslateModule
  ],
  exports: [
    LogInComponent 
  ]
})
export class HomeModule { }
