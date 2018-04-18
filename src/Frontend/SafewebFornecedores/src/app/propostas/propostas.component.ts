import { Component, OnInit } from '@angular/core';
import { Proposta, Situacao, PropostaFiltro } from './model/proposta.model';
import { PropostasService } from '../shared/services/propostas.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-propostas',
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css']
})
export class PropostasComponent implements OnInit {

  propostas: Proposta[];

  pesquisarForm: FormGroup;

  constructor(
    private propostasService: PropostasService,
    private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.pesquisarForm = this.fb.group({
      nome: [null],
      dataInicial: [null],
      dataFinal: [null],
      fornecedor: [null],
      categoria: [null],
      situacao: [null],
    });
  }

  get nome() { return this.pesquisarForm.get('nome'); }
  get dataInicial() { return this.pesquisarForm.get('dataInicial'); }
  get dataFinal() { return this.pesquisarForm.get('dataFinal'); }
  get fornecedor() { return this.pesquisarForm.get('fornecedor'); }
  get categoria() { return this.pesquisarForm.get('categoria'); }
  get situacao() { return this.pesquisarForm.get('situacao'); }

  ngOnInit() {
    this.getPropostas();
    this.onChanges();
  }

  getSituacao(value: number): any {
    return Situacao[value];
  }

  prepareToSearch(): PropostaFiltro {
    const formModel = this.pesquisarForm.value;

    const model: PropostaFiltro = {
      Nome: formModel.nome,
      DataInicial: null,
      DataFinal: null,
      Fornecedor: formModel.fornecedor,
      Categoria: formModel.Categoria,
      Situacao: formModel.situacao
      
    };
    return model;
  }

  getPropostas() {
    var filtros = this.prepareToSearch();
    
    this.propostasService.getAll(filtros)
      .subscribe(propostas => {
        this.propostas = propostas;
      });
  }

  onChanges() {
    this.pesquisarForm.valueChanges.subscribe(val => {
      this.getPropostas();
      console.log('Form Change');
      console.log(val);
    });
  }

}