import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  isLoggedIn: boolean;
  redirectUrl: string;

  constructor() { }

}
