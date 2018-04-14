import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { UserRegister } from '../../shared/models/user-register';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: new FormControl('pablotdvsm@gmail.com', Validators.required),
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      nome: ['Pablo Tôndolo de Vargas', Validators.required],
      cpf: new FormControl('', Validators.required),
      dataNascimento: ['12/12/1986', Validators.required],
    }, {
        validator: RegisterComponent.equalsTo
      });
    console.log(this.registerForm);
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

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.registerForm);
  }

  teste(value: any) {
    console.log(value);
  }

  register({ value, valid }: { value: UserRegister, valid: boolean }) {
    console.log(value);
    console.log(valid);
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    if (valid) {
      this.userService.register(value)
        .finally(() => this.isRequesting = false)
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/']);
            }
          }, errors => {
            console.log(errors);
            this.errors = errors;
          });
    }
  }

}
