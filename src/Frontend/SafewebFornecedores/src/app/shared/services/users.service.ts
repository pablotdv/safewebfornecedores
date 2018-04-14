import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';
import { BaseService } from './base.service';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';



@Injectable()
export class UsersService extends BaseService {

  constructor(private http: HttpClient,
    private authService: AuthService) {
    super();
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/api/users`)
      .pipe(
        catchError(this.handleError<Usuario[]>('getAll'))
      );
  }

  get(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/api/users/${id}`)
      .pipe(
        catchError(this.handleError<Usuario>('get'))
      );
  }

}
