import { Component, OnInit } from '@angular/core';
import { Proposta, Situacao } from '../model/proposta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostasService } from '../../shared/services/propostas.service';

@Component({
  selector: 'app-proposta-excluir',
  templateUrl: './proposta-excluir.component.html',
  styleUrls: ['./proposta-excluir.component.css']
})
export class PropostaExcluirComponent implements OnInit {

  proposta: Proposta;
  constructor(
    private route: ActivatedRoute,
    private propostasServices: PropostasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.propostasServices.get(this.route.snapshot.params['id'])
      .subscribe(proposta => this.proposta = proposta);
  }

  excluir() {
    this.propostasServices.delete(this.route.snapshot.params['id'])
      .subscribe(res => this.router.navigate(['/propostas']));
  }

  getSituacao(value: number):any{
    return Situacao[value];
  }
}
