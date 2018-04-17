import { Component, OnInit } from '@angular/core';
import { FornecedoresService } from '../../shared/services/fornecedores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fornecedor } from '../models/fornecedor.model';
import { Router } from '@angular/router';
import { MensagemFormulario } from '../../shared/consts';
import { NotificationErrorsService } from '../../shared/services/notification-errors.service';

@Component({
  selector: 'app-fornecedor-cadastrar',
  templateUrl: './fornecedor-cadastrar.component.html',
  styleUrls: ['./fornecedor-cadastrar.component.css']
})
export class FornecedorCadastrarComponent implements OnInit {
  fornecedorForm: FormGroup;

  constructor(
    private fornecedoresService: FornecedoresService,
    private fb: FormBuilder,
    private router: Router,
    private errorsService: NotificationErrorsService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.fornecedorForm = this.fb.group({
      cpfCnpj: ['', Validators.required],
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get cpfCnpj() { return this.fornecedorForm.get('cpfCnpj'); }
  get nome() { return this.fornecedorForm.get('nome'); }
  get telefone() { return this.fornecedorForm.get('telefone'); }
  get email() { return this.fornecedorForm.get('email'); }

  prepareToSave(): Fornecedor {
    const formModel = this.fornecedorForm.value;

    const fornecedorModel: Fornecedor = {
      CpfCnpj: formModel.cpfCnpj,
      Nome: formModel.nome,
      Telefone: formModel.telefone,
      Email: formModel.email,
      FornecedorId: '00000000-0000-0000-0000-000000000000',
    };
    return fornecedorModel;
  }

  onSubmit() {    
    if (this.fornecedorForm.invalid) {
      this.errorsService.notify([MensagemFormulario]);
    }
    else {
      let fornecedor = this.prepareToSave();
      this.fornecedoresService.post(fornecedor)
        .subscribe(res => {
          this.router.navigate(['/fornecedores']);
        });
    }
  }
}
