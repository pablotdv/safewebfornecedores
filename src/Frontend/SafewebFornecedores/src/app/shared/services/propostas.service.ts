import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Proposta, PropostaEditar } from '../../propostas/model/proposta.model';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class PropostasService extends BaseService {

  urlPropostas = `${this.baseUrl}/api/propostas`;

  constructor(private http: HttpClient,
    private notificationService: NotificationService
  ) {
    super();
  }

  getAll(): Observable<Proposta[]> {
    return this.http.get<Proposta[]>(this.urlPropostas)
      .pipe(
        catchError(this.handleError<Proposta[]>('getAll'))
      );
  }

  get(id: string): Observable<Proposta> {
    return this.http.get<Proposta>(`${this.urlPropostas}/${id}`)
      .pipe(
        catchError(this.handleError<Proposta>('get'))
      );
  }

  post(categoria: Proposta): Observable<Proposta> {
    return this.http.post<Proposta>(this.urlPropostas, categoria)
      .pipe(
        tap(
          res => {
            this.notificationService.notify('Proposta salva com sucesso!');
          }
        ),
        catchError(this.handleError<Proposta>('account/register'))
      );
  }

  put(categoria: PropostaEditar): Observable<PropostaEditar> {
    return this.http.put<PropostaEditar>(`${this.urlPropostas}/${categoria.PropostaId}`, categoria)
      .pipe(
        tap(
          res => this.notificationService.notify('Proposta salvo com sucesso!'),
          error => catchError(this.handleError<PropostaEditar>('put'))
        )
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlPropostas}/${id}`)
      .pipe(
        tap(
          res => this.notificationService.notify('Proposta excluído com sucesso!'),
          error => catchError(this.handleError<any>('put'))
        )
      );
  }
}
