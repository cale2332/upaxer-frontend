import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends CoreService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  getSchedules(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.getRemoteEndpointBaseUrl + `api-schedule-managment/getSchedules`)
      .pipe(catchError(this.handleError<any>('getSchedules')));
  }
  saveSchedule(catalog: any): Observable<any> {
    return this.httpClient.post(this.getRemoteEndpointBaseUrl + 'api-schedule-managment/saveSchedule', catalog.schedule)
    .pipe(catchError(this.handleError<any>('saveSchedule')));
  }

}
