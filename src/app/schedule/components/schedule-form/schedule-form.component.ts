

import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpHandler } from '@angular/common/http';
import { ScheduleService } from 'src/app/core/services/schedule.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {

  catalogTitle : string;
  id : string = '00000000-0000-0000-0000-000000000000';
  form = this.fb.group({
    name: ['', Validators.required],
    middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    birthday: ['', Validators.required],
    nickName: ['', Validators.required],
    active: [false]
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ScheduleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private scheduleService: ScheduleService
    ) 
    {
      this.catalogTitle = this.data.catalogTitle;
      this.id = data.row.id;
      this.form.controls.name.setValue(data.row.name);
      this.form.controls.middleName.setValue(data.row.middleName);
      this.form.controls.lastName.setValue(data.row.lastName);
      this.form.controls.phone.setValue(data.row.phone);
      this.form.controls.email.setValue(data.row.email);
      this.form.controls.birthday.setValue(data.row.birthday);
      this.form.controls.nickName.setValue(data.row.nickName);
      this.form.controls.active.setValue(data.row.active);

    }

    ngOnInit() {
      //this.form = this.createControl();
    }
    public createControl() {
      const group = this.fb.group({});
      const control = this.fb.control(
      name,  [Validators.required, Validators.max(50)]
      );

      group.addControl('name', control);
      return group;
    }
  
    getErrorMessageName() {
      if (this.form.controls.name.hasError('required')) {
      return 'Es requerido el nombre';
      }
   } 
    getErrorMessageFirst() {
      if (this.form.controls.middleName.hasError('required')) {
        return 'Es requerido el apellido paterno';
        }
    }
  save($event: any)
  {
    if(this.form.valid) {
      this.form.value.id = this.id;

      this.scheduleService.saveSchedule({schedule : this.form.value }).subscribe((data) => {

        if(data.success)
        {
          this.form.value.id = data.id;
          this.dialogRef.close(this.form.value); 
        }
        else
        {
          this.dialogRef.close();
        }
      }, error => {
         console.log(error);
       });
    }
    else {
      console.log('No Entro')
    }
  }
}
