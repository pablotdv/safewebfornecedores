import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { Usuario } from '../../shared/models/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UsuarioEditarModel } from '../models/usuario-editar.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  mask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  maskDate = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  usuarioForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.usersService.get(this.route.snapshot.params['id'])
      .subscribe(usuario => {
        this.createForm(usuario);
      });
  }

  createForm(value: Usuario) {
    this.usuarioForm = this.fb.group({
      cpf: [value.Cpf, [Validators.required]],
      nome: [value.Nome, [Validators.required]],
      dataNascimento: [new DatePipe('pt').transform(value.DataNascimento, 'dd/MM/yyyy'), [Validators.required]],
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

  prepareToSave(): UsuarioEditarModel {
    const formModel = this.usuarioForm.value;

    let dataPartes = formModel.dataNascimento.split('/');
    let dia = dataPartes[0];
    let mes = dataPartes[1];
    let ano = dataPartes[2];
    let data = `${ano}-${mes}-${dia}`;

    const usuarioModel: UsuarioEditarModel = {
      Cpf: formModel.cpf,
      Nome: formModel.nome,
      DataNascimento: data,
      Email: formModel.email,
      Id: formModel.id,
    };
    return usuarioModel;
  }

  onSubmit() {
    let usuarioModel = this.prepareToSave();
    console.log(usuarioModel);
    this.usersService.put(usuarioModel)
      .subscribe(res => {
        if (res == null) {
          this.router.navigate(['/users']);
        }
      });
  }

}
