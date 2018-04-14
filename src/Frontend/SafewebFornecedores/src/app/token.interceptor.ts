import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './shared/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.auth.isLoggedIn) {
            const newReq = req
                .clone({
                    headers: req.headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
                });

            return next.handle(newReq);
        }

        return next.handle(req);
    }
}