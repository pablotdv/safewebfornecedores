import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { Usuario } from '../../shared/models/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      nome: [value.Nome],
      dataNascimento: [value.DataNascimento],
      email: [value.Email],
      id: [value.Id],
      userName: [value.UserName]
    });
    console.log(this.usuarioForm);
  }

  get cpf() { return this.usuarioForm.get('cpf'); }

}
