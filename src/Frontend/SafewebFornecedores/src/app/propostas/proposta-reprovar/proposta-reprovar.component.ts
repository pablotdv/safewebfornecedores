import { Component, OnInit } from '@angular/core';
import { Proposta, Situacao } from '../model/proposta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostasService } from '../../shared/services/propostas.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-proposta-reprovar',
  templateUrl: './proposta-reprovar.component.html',
  styleUrls: ['./proposta-reprovar.component.css']
})
export class PropostaReprovarComponent implements OnInit {

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
          this.notificationService.notify(`A proposta #${proposta.Numero} não pode ser mais reprovada.`);
          this.router.navigate(['/propostas']);
        } else
          this.proposta = proposta;
      });
  }

  reprovar() {
    this.propostasServices.reprovar(this.proposta)
      .subscribe(res => this.router.navigate(['/propostas']));
  }

  getSituacao(value: number): any {
    return Situacao[value];
  }

}
