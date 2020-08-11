

import { Router } from '@angular/router';
import {Component, Inject, OnInit, ViewChild, ElementRef, Optional, OnChanges} from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnChanges {
   lang = '';
  form = this.fb.group({
    userName: ['admin', Validators.required],
    password: ['123456789', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    //public dialogRef: MatDialogRef<ScheduleFormComponent>,
    private userService: UserService,
    private router: Router,
    public translate: TranslateService
   
    )
    { 
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }
    
    public createControl() {
      const group = this.fb.group({});
      const control = this.fb.control(
      name,  [Validators.required, Validators.max(50)]

      )

      group.addControl('name', control);
      return group;
    }

    getErrorMessageUser() {
      if (this.form.controls.userName.hasError('required')) {
      return 'Es requerido el usuario';
      }
   }
    getErrorMessagePassword() {
      if (this.form.controls.password.hasError('required')) {
        return 'Es requerido el password';
      }
    }
  login($event: any)
  {
    if(this.form.valid) {

      this.userService.login(this.form.value).subscribe((data) => {
        if(data.exist)
        {

          this.router.navigate(['UserDetail/',data.id]);
        }
        else
        {
          //this.dialogRef.close();
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
