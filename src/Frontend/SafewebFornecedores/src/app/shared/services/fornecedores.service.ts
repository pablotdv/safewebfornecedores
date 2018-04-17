import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { NotificationService } from '../notification.service';
import { Fornecedor } from '../../fornecedores/models/fornecedor.model';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NotificationErrorsService } from './notification-errors.service';

@Injectable()
export class FornecedoresService extends BaseService {
  urlFornecedores = `${this.baseUrl}/api/fornecedores`;

  constructor(private http: HttpClient,
    private notificationService: NotificationService, protected errorsService: NotificationErrorsService
  ) {
    super(errorsService);
  }

  getAll(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.urlFornecedores)
      .pipe(
        catchError(this.handleError<Fornecedor[]>('fornecedores/getAll'))
      );
  }

  get(id: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.urlFornecedores}/${id}`)
      .pipe(
        catchError(this.handleError<Fornecedor>('fornecedores/get'))
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
        catchError(this.handleError<Fornecedor>('fornecedores/post'))
      );
  }

  put(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.urlFornecedores}/${fornecedor.FornecedorId}`, fornecedor)
      .pipe(
        tap(
          res => this.notificationService.notify('Fornecedor salvo com sucesso!')
        ),
        catchError(this.handleError<Fornecedor>('fornecedores/put'))
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlFornecedores}/${id}`)
      .pipe(
        tap(
          res => this.notificationService.notify('Fornecedor excluído com sucesso!')
        ),
        catchError(this.handleError<any>('fornecedores/delete'))
      );
  }
}
