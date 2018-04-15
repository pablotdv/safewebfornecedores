import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Categoria, CategoriaEditar } from '../../categorias/models/categoria.model';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class CategoriasService extends BaseService {

  urlCategorias = `${this.baseUrl}/api/categorias`;

  constructor(private http: HttpClient,
    private notificationService: NotificationService
  ) {
    super();
  }

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlCategorias)
      .pipe(
        catchError(this.handleError<Categoria[]>('getAll'))
      );
  }

  get(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlCategorias}/${id}`)
      .pipe(
        catchError(this.handleError<Categoria>('get'))
      );
  }

  post(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlCategorias, categoria)
      .pipe(
        tap(
          res => {
            this.notificationService.notify('Categoria salva com sucesso!');
          }
        ),
        catchError(this.handleError<Categoria>('account/register'))
      );
  }

  put(categoria: CategoriaEditar): Observable<CategoriaEditar> {
    return this.http.put<CategoriaEditar>(`${this.urlCategorias}/${categoria.CategoriaId}`, categoria)
      .pipe(
        tap(
          res => this.notificationService.notify('Categoria salvo com sucesso!'),
          error => catchError(this.handleError<CategoriaEditar>('put'))
        )
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlCategorias}/${id}`)
      .pipe(
        tap(
          res => this.notificationService.notify('Categoria excluído com sucesso!'),
          error => catchError(this.handleError<any>('put'))
        )
      );
  }
}
