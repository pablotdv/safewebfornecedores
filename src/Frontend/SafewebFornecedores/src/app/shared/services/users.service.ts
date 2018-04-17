import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';
import { BaseService } from './base.service';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UsuarioEditarModel } from '../../users/models/usuario-editar.model';
import { RegisterBindingModel } from '../../users/models/register-binding.model';
import { NotificationService } from '../notification.service';
import { NotificationErrorsService } from './notification-errors.service';
import { Location } from '@angular/common';



@Injectable()
export class UsersService extends BaseService {

  constructor(private http: HttpClient,
    private notificationService: NotificationService, protected errorsService: NotificationErrorsService,
    protected location: Location
  ) {
    super(errorsService, location);
  }

  register(usuario: RegisterBindingModel): Observable<RegisterBindingModel> {
    return this.http.post<RegisterBindingModel>(`${this.baseUrl}/api/account/register`, usuario)
      .pipe(
        tap(
          res => {
            this.notificationService.notify('Usuário salvo com sucesso!');
          }
        ),
        catchError(this.handleError<RegisterBindingModel>('account/register'))
      );
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
        tap(res => this.notificationService.notify('Usuário salvo com sucesso!'),
          catchError(catchError(this.handleError<UsuarioEditarModel>('put')))
        )
      );
  }

  delete(id: string): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.baseUrl}/api/users/${id}`)
      .pipe(
        tap(
          res => this.notificationService.notify('Usuário excluído com sucesso!')
        ),
        catchError(this.handleError<Usuario>('put'))
      );
  }
}
