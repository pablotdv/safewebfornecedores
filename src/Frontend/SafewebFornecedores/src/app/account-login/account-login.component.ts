import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { LoginModel } from '../shared/models/login-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {

  loginForm: FormGroup;

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['pablotdvsm@gmail.com', [Validators.required, Validators.email]],
      password: ['F452e9info@', Validators.required]
    });
  }

  prepareToSave(): LoginModel {
    const formModel = this.loginForm.value;

    const loginModel: LoginModel = {
      userName: formModel.email,
      password: formModel.password
    };
    return loginModel;
  }

  onSubmit() {
    let loginModel = this.prepareToSave();
    this.authService.login(loginModel)
      .subscribe(res => {
        if (this.authService.isLoggedIn)
          this.router.navigate(['/home']);        
      });
  }

}
