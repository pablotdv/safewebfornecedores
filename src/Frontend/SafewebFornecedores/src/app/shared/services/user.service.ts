import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { BaseService } from './base.service';
import { UserRegister } from '../models/user-register';
import { ConfigService } from './config.service';

@Injectable()
export class UserService extends BaseService {

  baseUrl: string = '';

  private loggedIn = false;

  constructor(private http: Http, private configService: ConfigService) {
    super();

    this.baseUrl = configService.getApiURI();
  }

  register(user: UserRegister): Observable<UserRegister> {
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:50343/api/Account/Register", body, options)
      .map(res => true)
      .catch(this.handleError);
  }
}
