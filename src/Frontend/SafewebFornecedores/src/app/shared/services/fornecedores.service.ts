import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { NotificationService } from '../notification.service';
import { Fornecedor, FornecedorEditar } from '../../fornecedores/models/fornecedor.model';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FornecedoresService extends BaseService {
  urlFornecedores = `${this.baseUrl}/api/fornecedores`;

  constructor(private http: HttpClient,
    private notificationService: NotificationService
  ) {
    super();
  }

  getAll(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.baseUrl}/api/fornecedores`)
      .pipe(
        catchError(this.handleError<Fornecedor[]>('getAll'))
      );
  }

  get(id: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.urlFornecedores}/${id}`)
      .pipe(
        catchError(this.handleError<Fornecedor>('get'))
      );
  }

  post(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.urlFornecedores, fornecedor)
      .pipe(
        tap(
          res => {
            this.notificationService.notify('Fornecedor salvo com sucesso!');
          }
        ),
        catchError(this.handleError<Fornecedor>('account/register'))
      );
  }

  put(fornecedor: FornecedorEditar): Observable<FornecedorEditar> {
    return this.http.put<FornecedorEditar>(`${this.urlFornecedores}/${fornecedor.FornecedorId}`, fornecedor)
      .pipe(
        tap(
          res => this.notificationService.notify('Fornecedor salvo com sucesso!'),
          error => catchError(this.handleError<FornecedorEditar>('put'))
        )
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlFornecedores}/${id}`)
      .pipe(
        tap(
          res => this.notificationService.notify('Fornecedor excluído com sucesso!'),
          error => catchError(this.handleError<any>('put'))
        )
      );
  }
}
