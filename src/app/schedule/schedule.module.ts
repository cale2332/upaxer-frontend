import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component'
import { ScheduleTableComponent } from './components/schedule-table/schedule-table.component'
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component'
import {  SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    SchedulePageComponent,
    ScheduleTableComponent,
    ScheduleFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'schedule', component: SchedulePageComponent },
      { path: '**', redirectTo: '404', pathMatch: 'full' }
    ]),
    SharedModule
  ],
  exports: [
    SchedulePageComponent,
    ScheduleTableComponent,
    ScheduleFormComponent
  ]
})
export class ScheduleModule { }
