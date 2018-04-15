import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './shared/services/auth.service';
import { NotificationService } from './shared/notification.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private notificatio: NotificationService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.isLoggedIn) { return true; }

    this.notificatio.notify('Faça login para poder acessar esse recurso.');
    this.router.navigate(['/account/login']);
    return false;
  }
}
