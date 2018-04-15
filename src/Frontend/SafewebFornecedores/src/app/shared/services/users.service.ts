import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';
import { BaseService } from './base.service';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UsuarioEditarModel } from '../../users/models/usuario-editar.model';



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

  put(usuario: UsuarioEditarModel): Observable<UsuarioEditarModel> {
    return this.http.put<UsuarioEditarModel>(`${this.baseUrl}/api/users/${usuario.Id}`, usuario)
      .pipe(
        tap(
          res => console.log(res),
          error => catchError(this.handleError<UsuarioEditarModel>('put'))
        )
      );
  }

  delete(id: string): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.baseUrl}/api/users/${id}`)
      .pipe(
        tap(
          res => console.log(res),
          error => catchError(this.handleError<UsuarioEditarModel>('put'))
        )
      );
  }

}
