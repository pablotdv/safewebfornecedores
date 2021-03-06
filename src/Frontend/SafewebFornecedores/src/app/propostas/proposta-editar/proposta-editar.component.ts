import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropostasService } from '../../shared/services/propostas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Proposta, Situacao } from '../model/proposta.model';
import { Fornecedor } from '../../fornecedores/models/fornecedor.model';
import { Categoria } from '../../categorias/models/categoria.model';
import { FornecedoresService } from '../../shared/services/fornecedores.service';
import { CategoriasService } from '../../shared/services/categorias.service';
import { NotificationErrorsService } from '../../shared/services/notification-errors.service';
import { MensagemFormulario } from '../../shared/consts';

@Component({
  selector: 'app-proposta-editar',
  templateUrl: './proposta-editar.component.html',
  styleUrls: ['./proposta-editar.component.css']
})
export class PropostaEditarComponent implements OnInit {

  propostaForm: FormGroup;

  fornecedores: Fornecedor[];
  categorias: Categoria[];

  constructor(
    private propostasService: PropostasService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fornecedoresService: FornecedoresService,
    private categoriasService: CategoriasService,
    private errorsService: NotificationErrorsService
  ) {
  }

  ngOnInit() {
    this.fornecedoresService.getAll()
      .subscribe(fornecedores => {
        this.fornecedores = fornecedores;
      });
    this.categoriasService.getAll()
      .subscribe(categorias => {
        this.categorias = categorias;
      });

    this.propostasService.get(this.route.snapshot.params['id'])
      .subscribe(proposta => {
        this.createForm(proposta);
      });
  }

  createForm(proposta: Proposta) {    
    this.propostaForm = this.fb.group({
      categoriaId: [proposta.CategoriaId, Validators.required],
      fornecedorId: [proposta.FornecedorId, Validators.required],
      nome: [proposta.Nome, [Validators.required, Validators.maxLength(200)]],
      valor: [proposta.Valor, [Validators.required, Validators.min(0)]],
      descricao: [proposta.Descricao],
      data: [proposta.Data],
      situacao: [proposta.Situacao],
      dataSituacao: [proposta.DataSituacao],
      numero: [proposta.Numero],
    });
  }

  get categoriaId() { return this.propostaForm.get('categoriaId'); }
  get fornecedorId() { return this.propostaForm.get('descricao'); }
  get nome() { return this.propostaForm.get('nome'); }
  get valor() { return this.propostaForm.get('valor'); }
  get descricao() { return this.propostaForm.get('descricao'); }
  get data() { return this.propostaForm.get('data'); }
  get situacao() { return this.propostaForm.get('situacao'); }
  get dataSituacao() { return this.propostaForm.get('dataSituacao'); }
  get numero() { return this.propostaForm.get('numero'); }

  prepareToSave(): Proposta {
    const formModel = this.propostaForm.value;

    const propostaModel: Proposta = {
      CategoriaId: formModel.categoriaId,
      FornecedorId: formModel.fornecedorId,
      Numero: formModel.numero,
      Nome: formModel.nome,
      Data: new Date(),
      Valor: formModel.valor,
      Descricao: formModel.descricao,
      Arquivo: '',
      DataSituacao: new Date(),
      Situacao: formModel.situacao,
      PropostaId: this.route.snapshot.params['id'],
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
      this.propostasService.put(proposta)
        .subscribe(res => {
          this.router.navigate(['/propostas']);
        });
    }
  }

  getSituacao(value: number): any {
    return Situacao[value];
  }
}
