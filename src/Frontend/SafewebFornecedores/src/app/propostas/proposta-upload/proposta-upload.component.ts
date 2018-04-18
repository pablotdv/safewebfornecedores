import { Component, OnInit } from '@angular/core';
import { Proposta, Situacao } from '../model/proposta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostasService } from '../../shared/services/propostas.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-proposta-upload',
  templateUrl: './proposta-upload.component.html',
  styleUrls: ['./proposta-upload.component.css']
})
export class PropostaUploadComponent implements OnInit {

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
        if (proposta.PropostaArquivo !== null) {
          this.notificationService.notify(`O arquivo da proposta #${proposta.Numero} já foi digitalizado`);
          this.router.navigate(['/propostas']);
        }
        else if (proposta.Situacao != Situacao.Aberto) {
          this.notificationService.notify(`A proposta #${proposta.Numero} já está aprovada`);
          this.router.navigate(['/propostas']);
        } else
          this.proposta = proposta;
      });
  }

  getSituacao(value: number): any {
    return Situacao[value];
  }

}
