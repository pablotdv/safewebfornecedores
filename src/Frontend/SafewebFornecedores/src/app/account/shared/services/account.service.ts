import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { UserToken } from './user-token';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  register() {

  }

  login(loginModel: LoginModel): Observable<UserToken> {    
    let url = 'http://localhost:50343/token';
    let body = `password=${loginModel.password}&userName=${loginModel.userName}&grant_type=password`;
    console.log(body);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    return this.http.post<UserToken>(url, body, httpOptions)      
      .pipe(
        catchError(this.handleError<UserToken>('login'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
