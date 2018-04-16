import { Component, OnInit } from '@angular/core';
import { FornecedoresService } from '../../shared/services/fornecedores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fornecedor } from '../models/fornecedor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor-cadastrar',
  templateUrl: './fornecedor-cadastrar.component.html',
  styleUrls: ['./fornecedor-cadastrar.component.css']
})
export class FornecedorCadastrarComponent implements OnInit {

  fornecedorForm: FormGroup;
  errors: string[] = [];

  constructor(
    private fornecedoresService: FornecedoresService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.fornecedorForm = this.fb.group({
      cpfCnpj: ['123123', Validators.required],
      nome: ['Pablo', Validators.required],
      telefone: ['123123', Validators.required],
      email: ['pablotdvsm@gmail.com', [Validators.required, Validators.email]]
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
    this.errors = [];

    let fornecedor = this.prepareToSave();

    console.log(fornecedor);
    this.fornecedoresService.post(fornecedor)
      .subscribe(res => {
        this.router.navigate(['/fornecedores']);
      }, error => {
        if (this.fornecedoresService.modelStateErrors && this.fornecedoresService.modelStateErrors.length > 0) {
          this.errors = this.fornecedoresService.modelStateErrors;
        }
        else {
          console.log(error);
        }
      });
  }





}
