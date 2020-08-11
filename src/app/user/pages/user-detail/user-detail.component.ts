import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public user = {
    userName: '',
    name: 'Alejandro',
    lastName: 'Valladares',
    photo:'https://material.angular.io/assets/img/examples/shiba2.jpg'

  }

  constructor(private userService: UserService, private route: ActivatedRoute, public translate: TranslateService) { 
    let userId = '';

    this.route.params.subscribe(params => {
      userId = params.userId;
    });

    this.userService.getUserInfo(userId).subscribe((data) => {
      debugger;
      if(data)
      {
        this.user.userName = data.userName;
      }
      else
      {
        //this.dialogRef.close();
      }
    }, error => {
       console.log(error);
     });

  }

  ngOnInit(): void {
  }

}
