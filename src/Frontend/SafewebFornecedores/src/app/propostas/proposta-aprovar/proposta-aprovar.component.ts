import { Component, OnInit } from '@angular/core';
import { Proposta, Situacao } from '../model/proposta.model';
import { PropostaAprovar } from '../model/proposta-aprovar.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostasService } from '../../shared/services/propostas.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-proposta-aprovar',
  templateUrl: './proposta-aprovar.component.html',
  styleUrls: ['./proposta-aprovar.component.css']
})
export class PropostaAprovarComponent implements OnInit {
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
        if (proposta.Situacao != Situacao.Aberto) {
          this.notificationService.notify(`A proposta #${proposta.Numero} já está aprovada`);
          this.router.navigate(['/propostas']);
        } else
          this.proposta = proposta;
      });
  }

  aprovar() {    
    this.propostasServices.aprovar(this.proposta)
      .subscribe(res => this.router.navigate(['/propostas']));
  }

  getSituacao(value: number): any {
    return Situacao[value];
  }

}
