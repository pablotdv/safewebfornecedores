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
  maskDate = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

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
  }

  getSituacao(value: number): any {
    return Situacao[value];
  }

  getDataString(value): string{
    let data: string = null;
    if (value) {
      var dataPartes: string[] = value.split('/');
      if (dataPartes.length === 3) {
        let dia = dataPartes[0];
        let mes = dataPartes[1];
        let ano = dataPartes[2];
        data = `${ano}-${mes}-${dia}`;
      }
    }
    return data;
  }

  prepareToSearch(): PropostaFiltro {
    const formModel = this.pesquisarForm.value;
    
    const model: PropostaFiltro = {
      Nome: formModel.nome,
      DataInicial: this.getDataString(formModel.dataInicial),
      DataFinal: this.getDataString(formModel.dataFinal),
      Fornecedor: formModel.fornecedor,
      Categoria: formModel.categoria,
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

  resetar() {
    this.createForm();
    this.getPropostas();
  }
}