import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../shared/models/login-model';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.formCreate();
  }

  ngOnInit() {
  }

  formCreate(): any {
    this.loginForm = this.fb.group({
      email: ['pablotdvsm@gmail.com', [Validators.required, Validators.email]],
      password: ['F452e9info@', Validators.required]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

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
    this.accountService.login(loginModel)
      .subscribe(res => {
        console.log(res);
        localStorage.setItem('access_token', res.access_token)
      });
  }
}
