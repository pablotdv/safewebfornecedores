import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login-model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { UserToken } from '../models/user-token';

@Injectable()
export class AuthService {  
  constructor(private http: HttpClient) { }

  login(loginModel: LoginModel): Observable<UserToken> {
    let url = 'http://localhost:50343/token';
    let body = `password=${loginModel.password}&userName=${loginModel.userName}&grant_type=password`;
    //console.log(body);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    return this.http.post<UserToken>(url, body, httpOptions)
      .pipe(
        tap(data => {          
          localStorage.setItem('user_token', JSON.stringify(data));
        },
          error => this.handleError<UserToken>('login'))
      );
  }

  logout() {
    localStorage.removeItem('user_token');    
  }

  get isLoggedIn(): boolean {
    let user_token = localStorage.getItem('user_token');
    if (user_token == null) return false;
    
    let userToken: UserToken = JSON.parse(user_token);        
    return Date.now() < new Date(userToken[".expires"]).getTime();
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
