import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})
export class UserService extends CoreService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  login(user: any): Observable<any> {
    let _user = { ...user, id: '00000000-0000-0000-0000-000000000000', active :false  }
    return this.httpClient.post(this.getRemoteEndpointBaseUrl + `api-security/login`, _user)
      .pipe(catchError(this.handleError<any>('login')));
  }
  getUserInfo(id: string): Observable<any> {
    return this.httpClient.get(this.getRemoteEndpointBaseUrl + `api-security/GetUserInfo?id=${id}`)
    .pipe(catchError(this.handleError<any>('saveUser')));
  }

}
