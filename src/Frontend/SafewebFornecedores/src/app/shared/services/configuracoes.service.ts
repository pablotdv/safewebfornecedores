import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { Configuracao } from '../../configuracoes/models/configuracao.model';
import { NotificationErrorsService } from './notification-errors.service';
import { Location } from '@angular/common';

@Injectable()
export class ConfiguracoesService extends BaseService {

  urlConfiguracoes = `${this.baseUrl}/api/configuracoes`;

  constructor(private http: HttpClient,
    private notificationService: NotificationService, protected errorsService: NotificationErrorsService,
    protected location: Location
  ) {
    super(errorsService, location);
  }

  get(): Observable<Configuracao> {
    return this.http.get<Configuracao>(`${this.urlConfiguracoes}`)
      .pipe(
        catchError(this.handleError<Configuracao>('configuracoes/get'))
      );
  }

  put(configuracao: Configuracao): Observable<Configuracao> {
    return this.http.put<Configuracao>(`${this.urlConfiguracoes}/${configuracao.ConfiguracaoId}`, configuracao)
      .pipe(
        tap(
          res => this.notificationService.notify('Configuracao salvo com sucesso!')
        ),
        catchError(this.handleError<Configuracao>('configuracoes/put'))
      );
  }
}
