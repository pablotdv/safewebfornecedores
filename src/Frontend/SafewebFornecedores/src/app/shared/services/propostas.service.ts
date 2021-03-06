import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Proposta, PropostaFiltro } from '../../propostas/model/proposta.model';
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

  getAll(filtros: PropostaFiltro): Observable<Proposta[]> {

    let params = new HttpParams();
    if (filtros.Nome)
      params = params.append('nome', filtros.Nome);
    else params = params.append('nome', '');
    if (filtros.DataInicial)
      params = params.append('dataInicial', filtros.DataInicial);
    else params = params.append('dataInicial', null);
    if (filtros.DataFinal)
      params = params.append('dataFinal', filtros.DataFinal);
    else params = params.append('dataFinal', null);
    if (filtros.Fornecedor)
      params = params.append('fornecedor', filtros.Fornecedor);
    else params = params.append('fornecedor', '');
    if (filtros.Categoria)
      params = params.append('categoria', filtros.Categoria);
    else params = params.append('categoria', '');
    if (filtros.Situacao)
      params = params.append('situacao', filtros.Situacao.toString());
    else params = params.append('situacao', null);

    return this.http.get<Proposta[]>(this.urlPropostas, { params: params })
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

  upload(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/PropostasArquivos/upload/`, formData).pipe(
      tap(
        res => {
          this.notificationService.notify(`Upload realizado com sucesso!`);
        }
      ),
      catchError(this.handleError<any>('PropostasArquivos/upload'))
    );

  }

  pdf(propostaId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/PropostasArquivos/${propostaId}`, {
      responseType: "blob"
    })
      .pipe(
        tap(res => {
          console.log(res);
        }),
        catchError(this.handleError<any>('PropostasArquivos/upload'))
      );
  }
}
