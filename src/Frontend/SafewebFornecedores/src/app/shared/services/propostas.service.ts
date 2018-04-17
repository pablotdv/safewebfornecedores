import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Proposta } from '../../propostas/model/proposta.model';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { PropostaAprovar } from '../../propostas/model/proposta-aprovar.model';

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

  post(proposta: Proposta): Observable<Proposta> {
    return this.http.post<Proposta>(this.urlPropostas, proposta)
      .pipe(
        tap(
          res => {
            this.notificationService.notify(`Proposta #${res.Numero} salva com sucesso!`);
          }
        ),
        catchError(this.handleError<Proposta>('post'))
      );
  }

  put(proposta: Proposta): Observable<Proposta> {
    return this.http.put<Proposta>(`${this.urlPropostas}/${proposta.PropostaId}`, proposta)
      .pipe(
        tap(
          res => this.notificationService.notify(`Proposta #${proposta.Numero} salva com sucesso!`),
          error => catchError(this.handleError<Proposta>('put'))
        )
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlPropostas}/${id}`)
      .pipe(
        tap(
          res => {
            this.notificationService.notify(`Proposta #${res.Numero} excluído com sucesso!`);
          },
          error => catchError(this.handleError<any>('delete'))
        )
      );
  }

  aprovar(proposta: Proposta): Observable<Proposta> {
    return this.http.put<Proposta>(`${this.urlPropostas}/aprovar/`, proposta)
      .pipe(
        tap(
          res => {
            this.notificationService.notify(`Proposta #${proposta.Numero} aprovada com sucesso!`);
          }
        ),
        catchError(this.handleError<Proposta>('aprovar'))
      );
  }

  reprovar(proposta: Proposta): Observable<Proposta> {
    return this.http.put<Proposta>(`${this.urlPropostas}/reprovar/`, proposta)
      .pipe(
        tap(
          res => {
            this.notificationService.notify(`Proposta #${proposta.Numero} reprovada com sucesso!`);
          }
        ),
        catchError(this.handleError<Proposta>('reprovar'))
      );
  }

}
