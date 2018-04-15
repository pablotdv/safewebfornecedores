import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { NotificationService } from '../notification.service';
import { Fornecedor } from '../../fornecedores/models/fornecedor.model';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FornecedoresService extends BaseService {

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

}
