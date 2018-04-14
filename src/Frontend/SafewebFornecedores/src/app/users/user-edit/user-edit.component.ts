import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { Usuario } from '../../shared/models/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  mask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  usuarioForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  usuario: Usuario;

  ngOnInit() {
    this.usersService.get(this.route.snapshot.params['id'])
      .subscribe(usuario => {
        this.usuario = usuario;
        this.createForm(this.usuario);
      });
  }

  createForm(value: Usuario) {    
    this.usuarioForm = this.fb.group({
      cpf: [value.Cpf, [Validators.required]],
      nome: [value.Nome, [Validators.required]],
      dataNascimento: [new Date(value.DataNascimento), [Validators.required]],
      email: [value.Email, [Validators.required]],
      id: [value.Id],
      userName: [value.UserName, [Validators.required]]
    });
  }

  get cpf() { return this.usuarioForm.get('cpf'); }
  get nome() { return this.usuarioForm.get('nome'); }
  get dataNascimento() { return this.usuarioForm.get('dataNascimento'); }
  get email() { return this.usuarioForm.get('email'); }
  get id() { return this.usuarioForm.get('id'); }
  get userName() { return this.usuarioForm.get('userName'); }

}
