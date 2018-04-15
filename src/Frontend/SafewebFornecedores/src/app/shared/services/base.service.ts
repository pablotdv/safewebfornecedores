import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { HttpErrorResponse } from "@angular/common/http";

export class BaseService {
    public modelStateErrors: string[] = [];

    protected baseUrl: string = 'http://localhost:50343';

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {            
            this.modelStateErrors = [];
            if (error instanceof HttpErrorResponse) {
                let er = <HttpErrorResponse>error;

                if (er.error.ModelState) {
                    for (var key in er.error.ModelState) {
                        var mensagens = er.error.ModelState[key];
                        for (var k in mensagens) {
                            this.modelStateErrors.push(mensagens[k]);
                        }
                    }
                }
            }

            if (this.modelStateErrors.length > 0) {
                throw new Error("Falha ao processa solicitação");                
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