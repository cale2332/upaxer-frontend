import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  protected MSG_NETWORK_API = 'Favor validar su conexión de internet o de servio de API';
  protected MSG_CONTACT_ADMIN = 'Favor comunicar con el administrador del sistema';
  protected MSG_LOGIN_FAILED = 'No se pudo completar el login, Favor validar su Usuario y Password';
  protected MSG_NOT_AUTHORIZED_API = 'No cuenta con autorización o Favor logearse de nuevo';
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(public httpClient: HttpClient) {

  }


  public getYears(start: number = 2017, end: number = new Date().getFullYear()): any[] {
    const years = [];
    for (let index = start; index <= end; index++) {
      years.push({ key: index, value: index });
    }
    return years;
  }

  public getMonths(): any[] {
    const months = [];
    for (let index = 1; index <= 12; index++) {
      months.push({ key: index, value: index });
    }
    return months;
  }

  public getNumbers(start: number = 1, end: number = 20): any[] {
    const numbers = [];
    for (let index = start; index <= end; index++) {
      numbers.push({ key: index, value: index });
    }
    return numbers;
  }

  protected get getRemoteEndpointBaseUrl(): string {
     return 'https://localhost:44338/web/';
  }

  public randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }

  public padLeft(str, len, pad = '0') {
    pad = typeof pad === undefined ? '0' : pad + '';
    str = str + '';
    while (str.length < len) {
      str = pad + str;
    }
    return str;
  }

  protected handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      let err_message = '';
      if (error instanceof HttpErrorResponse) {
        if (!navigator.onLine) {
          // No Internet connection
          err_message = `${operation} failed: No Internet Connection`;
        } else {
          if (error.error) {
            err_message = `${operation} failed: ${error.error.Message}`;
          } else {
            // Handle Http Error (error.status === 403, 404...)
            err_message = `${operation} failed: ${this.MSG_CONTACT_ADMIN}`;
            if (error.status === 401) {
              err_message = `${operation} failed: ${this.MSG_NOT_AUTHORIZED_API}`;
            } else if (error.status === 0) {
              err_message = `${operation} failed: ${this.MSG_NETWORK_API}`;
            } else if (error.status === 404 && operation === 'login') {
              err_message = `${operation} failed: ${this.MSG_LOGIN_FAILED}`;
            } else {
              err_message = `${operation} failed: ${error.status} - ${error.message}`;
            }
          }

        }
      } else {
        // Handle Client Error (Angular Error, ReferenceError...)
        // Log the error anyway
        console.error('It happens: ', error);
        err_message = `${operation} failed: ${error.message}`;
      }

      // Let the app keep running by returning an empty result.
      // return of(result as any);
      throw (err_message);
    };
  }

}