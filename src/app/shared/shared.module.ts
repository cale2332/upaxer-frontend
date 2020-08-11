import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "./material/material.module";
import { ModalComponent } from './modal/modal.component';
@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MaterialModule
  ]
})

export class SharedModule {
}
