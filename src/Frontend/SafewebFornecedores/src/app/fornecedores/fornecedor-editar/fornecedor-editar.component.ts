import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FornecedoresService } from '../../shared/services/fornecedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Fornecedor, FornecedorEditar } from '../models/fornecedor.model';

@Component({
  selector: 'app-fornecedor-editar',
  templateUrl: './fornecedor-editar.component.html',
  styleUrls: ['./fornecedor-editar.component.css']
})
export class FornecedorEditarComponent implements OnInit {

  fornecedorForm: FormGroup;
  errors: string[] = [];

  constructor(
    private fornecedoresService: FornecedoresService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('editar');
  }

  ngOnInit() {
    this.fornecedoresService.get(this.route.snapshot.params['id'])
      .subscribe(fornecedor => {
        this.createForm(fornecedor);
      });
  }

  createForm(fornecedor: Fornecedor) {
    this.fornecedorForm = this.fb.group({
      cpfCnpj: [fornecedor.CpfCnpj, Validators.required],
      nome: [fornecedor.Nome, Validators.required],
      telefone: [fornecedor.Telefone, Validators.required],
      email: [fornecedor.Email, [Validators.required, Validators.email]]
    });
  }

  get cpfCnpj() { return this.fornecedorForm.get('cpfCnpj'); }
  get nome() { return this.fornecedorForm.get('nome'); }
  get telefone() { return this.fornecedorForm.get('telefone'); }
  get email() { return this.fornecedorForm.get('email'); }

  prepareToSave(): FornecedorEditar {
    const formModel = this.fornecedorForm.value;

    const fornecedorModel: FornecedorEditar = {
      CpfCnpj: formModel.cpfCnpj,
      Nome: formModel.nome,
      Telefone: formModel.telefone,
      Email: formModel.email,
      FornecedorId: this.route.snapshot.params['id']
    };
    return fornecedorModel;
  }

  onSubmit() {
    this.errors = [];

    let fornecedor = this.prepareToSave();

    this.fornecedoresService.put(fornecedor)
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
