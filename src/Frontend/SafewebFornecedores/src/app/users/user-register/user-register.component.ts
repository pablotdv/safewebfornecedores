import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { Router } from '@angular/router';
import { RegisterBindingModel } from '../models/register-binding.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  mask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  maskDate = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  errors: string[] = [];

  registerForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['pablotdv@gmail.com', [Validators.required, Validators.email]],
      password: ['Pablo123@', Validators.required],
      confirmPassword: ['Pablo123@', Validators.required],
      nome: ['Pablo Tôndolo de Vargas', Validators.required],
      cpf: ['01214798039', Validators.required],
      dataNascimento: ['12/12/1986', Validators.required],
    }, { validator: UserRegisterComponent.equalsTo });

  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get nome() { return this.registerForm.get('nome'); }
  get cpf() { return this.registerForm.get('cpf'); }
  get dataNascimento() { return this.registerForm.get('dataNascimento'); }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const password = group.get('password')
    const confirmPassword = group.get('confirmPassword')
    if (!password || !confirmPassword) {
      return undefined
    }
    if (password.value !== confirmPassword.value) {
      return { passwordsNotMatch: true }
    }
    return undefined
  }

  prepareToSave(): RegisterBindingModel {
    const formModel = this.registerForm.value;

    let dataPartes = formModel.dataNascimento.split('/');
    let dia = dataPartes[0];
    let mes = dataPartes[1];
    let ano = dataPartes[2];
    let data = `${ano}-${mes}-${dia}`;

    const usuarioModel: RegisterBindingModel = {
      cpf: formModel.cpf.replace(/\./g,'').replace('-', ''),
      nome: formModel.nome,
      dataNascimento: data,
      email: formModel.email,
      password: formModel.password,
      confirmPassword: formModel.confirmPassword,
    };
    return usuarioModel;
  }

  onSubmit() {
    this.errors = [];

    let usuarioModel = this.prepareToSave();
    this.usersService.register(usuarioModel)
      .subscribe(res => {
        this.router.navigate(['/users']);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          let er = <HttpErrorResponse>error;

          if (er.error.ModelState) {
            for (var key in er.error.ModelState) {
              var mensagens = er.error.ModelState[key];
              for (var k in mensagens) {                
                this.errors.push(mensagens[k]);
              }
            }

          }
        }

      });
  }


}
