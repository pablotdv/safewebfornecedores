import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login-model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { UserToken } from '../models/user-token';
import { BaseService } from './base.service';
import { NotificationErrorsService } from './notification-errors.service';


@Injectable()
export class AuthService extends BaseService {
  constructor(private http: HttpClient, protected errorsService: NotificationErrorsService) {
    super(errorsService);
  }

  login(loginModel: LoginModel): Observable<UserToken> {
    let url = `${this.baseUrl}/token`;
    let body = `password=${loginModel.password}&userName=${loginModel.userName}&grant_type=password`;
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    return this.http.post<UserToken>(url, body, httpOptions)
      .pipe(
        tap(data => {
          localStorage.setItem('user_token', JSON.stringify(data));
        }), catchError(this.handleError<UserToken>('login'))
      );
  }

  logout(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    return this.http.post(`${this.baseUrl}/api/account/Logout`, httpOptions)
      .pipe(
        tap(data => {
          localStorage.removeItem('user_token');
        },
          error => this.handleError<any>('login')));
  }

  get isLoggedIn(): boolean {
    let user_token = localStorage.getItem('user_token');
    if (user_token == null) return false;

    let userToken: UserToken = JSON.parse(user_token);
    return Date.now() < new Date(userToken[".expires"]).getTime();
  }

  getToken(): string {
    let user_token = localStorage.getItem('user_token');


    let userToken: UserToken = JSON.parse(user_token);
    return userToken.access_token;
  }


}
