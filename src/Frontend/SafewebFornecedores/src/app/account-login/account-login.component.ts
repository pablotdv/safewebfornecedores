import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { LoginModel } from '../shared/models/login-model';
import { Router } from '@angular/router';
import { NotificationErrorsService } from '../shared/services/notification-errors.service';
import { MensagemFormulario } from '../shared/consts';

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
    private authService: AuthService,
    private errorsService: NotificationErrorsService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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
    if (this.loginForm.invalid) {
      this.errorsService.notify([MensagemFormulario]);
    }
    else {
      this.authService.login(loginModel)
        .subscribe(res => {
          if (this.authService.isLoggedIn)
            this.router.navigate(['/home']);
        });
    }
  }

}
