import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'managament';

  constructor(private router: Router,  public translate: TranslateService) {

    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
  }

 
  validateRouter(){
    if(this.router.url === "/"){
        return true
   }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
