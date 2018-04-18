import { Component, OnInit } from '@angular/core';
import { Proposta, Situacao } from '../model/proposta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostasService } from '../../shared/services/propostas.service';
import { NotificationService } from '../../shared/notification.service';

import { saveAs } from 'file-saver/FileSaver';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-proposta-detalhes',
  templateUrl: './proposta-detalhes.component.html',
  styleUrls: ['./proposta-detalhes.component.css']
})
export class PropostaDetalhesComponent implements OnInit {

  
  proposta: Proposta;
  propostaArquivo: string = '';

  constructor(
    private route: ActivatedRoute,
    private propostasServices: PropostasService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getProposta();
  }

  getProposta() {
    this.propostasServices.get(this.route.snapshot.params['id'])
      .subscribe(proposta => {
        this.proposta = proposta;
      });
  }

  aprovar() {
    this.propostasServices.aprovar(this.proposta)
      .subscribe(res => this.router.navigate(['/propostas']));
  }

  reprovar() {
    this.propostasServices.reprovar(this.proposta)
      .subscribe(res => this.router.navigate(['/propostas']));
  }

  excluir() {
    this.propostasServices.delete(this.proposta.PropostaId)
      .subscribe(res => this.router.navigate(['/propostas']));
  }

  pdf() {
    if (!this.propostaArquivo) {
      this.propostasServices.pdf(this.proposta.PropostaId)
        .subscribe(
          res => {

            if (res) {
              var blob = new Blob([res], { type: 'application/pdf' });
              var url = window.URL.createObjectURL(blob);
              this.propostaArquivo = url;              
            }
          },
          error => console.log(error)
        );
    }
  }

  download() {
    this.propostasServices.pdf(this.proposta.PropostaId)
      .subscribe(
        res => {
          if (res) {
            var blob = new Blob([res], { type: 'application/pdf' });
            var url = window.URL.createObjectURL(blob);
            this.propostaArquivo = url;
            saveAs(blob, `${this.proposta.Nome}.pdf`);
          }
        }
      );
  }

  getSituacao(value: number): any {
    return Situacao[value];
  }

  refreshUpload(event) {    
    if (event) {
      this.pdf();      
    }
  }

}
