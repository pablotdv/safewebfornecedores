import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { Usuario } from '../../shared/models/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UsuarioEditarModel } from '../models/usuario-editar.model';
import { MensagemFormulario } from '../../shared/consts';
import { NotificationErrorsService } from '../../shared/services/notification-errors.service';

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
    private router: Router,
    private errorsService: NotificationErrorsService) {
  }

  ngOnInit() {
    this.usersService.get(this.route.snapshot.params['id'])
      .subscribe(usuario => {
        this.createForm(usuario);
      });
  }

  createForm(value: Usuario) {
    this.usuarioForm = this.fb.group({
      cpf: [value.Cpf, [Validators.required, Validators.maxLength(11)]],
      nome: [value.Nome, [Validators.required, Validators.maxLength(200)]],
      dataNascimento: [new DatePipe('pt').transform(value.DataNascimento, 'dd/MM/yyyy'), [Validators.required]],
      email: [value.Email, [Validators.required, Validators.email]],
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
    if (this.usuarioForm.invalid) {
      this.errorsService.notify([MensagemFormulario]);
    }
    else {
      let usuarioModel = this.prepareToSave();
      this.usersService.put(usuarioModel)
        .subscribe(res => this.router.navigate(['/users']));
    }
  }

}
