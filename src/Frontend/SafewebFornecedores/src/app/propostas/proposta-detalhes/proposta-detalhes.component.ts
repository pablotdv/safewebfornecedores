import { Component, OnInit } from '@angular/core';
import { Proposta, Situacao } from '../model/proposta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostasService } from '../../shared/services/propostas.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-proposta-detalhes',
  templateUrl: './proposta-detalhes.component.html',
  styleUrls: ['./proposta-detalhes.component.css']
})
export class PropostaDetalhesComponent implements OnInit {

  proposta: Proposta;

  constructor(
    private route: ActivatedRoute,
    private propostasServices: PropostasService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
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

  getSituacao(value: number): any {
    return Situacao[value];
  }
}
