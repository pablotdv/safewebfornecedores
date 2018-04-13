import { Observable } from 'rxjs/Rx';

export abstract class BaseService {
    constructor() { }

    protected handleError(error: any) {        
        var applicationError = error.headers.get('Application-Error');

        if (applicationError) {
            return Observable.throw(applicationError);
        }

        var modelStateErrors = '';
        var serverError = error.json();

        if (!serverError.type) {
            for (var key in serverError) {
              if (typeof serverError[key] === 'object') {
                var modelState = serverError[key];
                for (var modelKey in modelState) {
                  modelStateErrors += modelState[modelKey] + '\n';
                }
              }
              else
                modelStateErrors += serverError[key] + '\n';
            }
          }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Observable.throw(modelStateErrors || 'Server error');
    }
}