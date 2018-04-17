import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationErrorsService } from "./notification-errors.service";

export class BaseService {
    public modelStateErrors: string[] = [];

    protected baseUrl: string = 'http://localhost:50343';

    constructor(protected errorsService: NotificationErrorsService) { }

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.modelStateErrors = [];
            if (error instanceof HttpErrorResponse) {
                let er = <HttpErrorResponse>error;

                if (er.status === 400 && er.error.error === 'invalid_grant') {
                    this.modelStateErrors.push('Seu usuário ou senha estão incorretos.');
                }
                if (er.status === 401) {
                    this.modelStateErrors.push('Seu usuário não tem permissão de acesso ao recurso selecionado.');
                } else {

                    if (er.error.ModelState) {
                        for (var key in er.error.ModelState) {
                            var mensagens = er.error.ModelState[key];
                            for (var k in mensagens) {
                                this.modelStateErrors.push(mensagens[k]);
                            }
                        }
                    }
                }
            }

            if (this.modelStateErrors.length > 0) {
                this.errorsService.notify(this.modelStateErrors);
                throw new Error("Falha ao processar solicitação");
            }

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}