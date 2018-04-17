import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Proposta } from '../../propostas/model/proposta.model';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { PropostaAprovar } from '../../propostas/model/proposta-aprovar.model';
import { NotificationErrorsService } from './notification-errors.service';
import { Location } from '@angular/common';

@Injectable()
export class PropostasService extends BaseService {

  urlPropostas = `${this.baseUrl}/api/propostas`;

  constructor(private http: HttpClient,
    private notificationService: NotificationService, protected errorsService: NotificationErrorsService,
    protected location: Location
  ) {
    super(errorsService, location);
  }

  getAll(): Observable<Proposta[]> {
    return this.http.get<Proposta[]>(this.urlPropostas)
      .pipe(
        catchError(this.handleError<Proposta[]>('propostas/getAll'))
      );
  }

  get(id: string): Observable<Proposta> {
    return this.http.get<Proposta>(`${this.urlPropostas}/${id}`)
      .pipe(
        catchError(this.handleError<Proposta>('propostas/get'))
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
        catchError(this.handleError<Proposta>('propostas/post'))
      );
  }

  put(proposta: Proposta): Observable<Proposta> {
    return this.http.put<Proposta>(`${this.urlPropostas}/${proposta.PropostaId}`, proposta)
      .pipe(
        tap(
          res => this.notificationService.notify(`Proposta #${proposta.Numero} salva com sucesso!`)
        ),
        catchError(this.handleError<Proposta>('propostas/put'))
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlPropostas}/${id}`)
      .pipe(
        tap(
          res => {
            this.notificationService.notify(`Proposta #${res.Numero} excluído com sucesso!`);
          }
        ), catchError(this.handleError<any>('propostas/delete'))
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
        catchError(this.handleError<Proposta>('propostas/aprovar'))
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
        catchError(this.handleError<Proposta>('propostas/reprovar'))
      );
  }
}
