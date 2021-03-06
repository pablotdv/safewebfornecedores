import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropostasService } from '../../shared/services/propostas.service';
import { Router } from '@angular/router';
import { Proposta } from '../model/proposta.model';
import { Fornecedor } from '../../fornecedores/models/fornecedor.model';
import { Categoria } from '../../categorias/models/categoria.model';
import { FornecedoresService } from '../../shared/services/fornecedores.service';
import { CategoriasService } from '../../shared/services/categorias.service';
import { NotificationErrorsService } from '../../shared/services/notification-errors.service';
import { MensagemFormulario } from '../../shared/consts';

@Component({
  selector: 'app-proposta-cadastrar',
  templateUrl: './proposta-cadastrar.component.html',
  styleUrls: ['./proposta-cadastrar.component.css']
})
export class PropostaCadastrarComponent implements OnInit {

  maskDate = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  propostaForm: FormGroup;
  
  fornecedores: Fornecedor[];
  categorias: Categoria[];

  constructor(
    private propostasService: PropostasService,
    private fb: FormBuilder,
    private router: Router,
    private fornecedoresService: FornecedoresService,
    private categoriasService: CategoriasService,
    private errorsService: NotificationErrorsService,
  ) { }

  ngOnInit() {
    this.fornecedoresService.getAll()
      .subscribe(fornecedores => {
        this.fornecedores = fornecedores;        
      });
    this.categoriasService.getAll()
      .subscribe(categorias => {
        this.categorias = categorias;        
      });
    this.createForm();
  }

  createForm() {
    this.propostaForm = this.fb.group({
      categoriaId: ['', Validators.required],
      fornecedorId: ['', Validators.required],
      nome: ['', [Validators.required, Validators.maxLength(200)]],
      valor: ['', [Validators.required, Validators.min(0)]],
      descricao: ['']
    });
  }

  get categoriaId() { return this.propostaForm.get('categoriaId'); }
  get fornecedorId() { return this.propostaForm.get('fornecedorId'); }
  get nome() { return this.propostaForm.get('nome'); }
  get valor() { return this.propostaForm.get('valor'); }
  get descricao() { return this.propostaForm.get('descricao'); }

  prepareToSave(): Proposta {
    const formModel = this.propostaForm.value;

    const propostaModel: Proposta = {
      CategoriaId: formModel.categoriaId,
      FornecedorId: formModel.fornecedorId,
      Numero: 0,
      Nome: formModel.nome,
      Data: new Date(),
      Valor: formModel.valor,
      Descricao: formModel.descricao,
      Arquivo: '',
      DataSituacao: new Date(),
      Situacao: 0,
      PropostaId: '00000000-0000-0000-0000-000000000000',
      PropostaArquivo: null,
    };
    return propostaModel;
  }

  onSubmit() {
    if (this.propostaForm.invalid) {
      this.errorsService.notify([MensagemFormulario]);
    }
    else {
      let proposta = this.prepareToSave();
      this.propostasService.post(proposta)
        .subscribe(res => {
          this.router.navigate(['/propostas']);
        });
    }
  }
}
