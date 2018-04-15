import { Component, OnInit } from '@angular/core';
import { Proposta } from './model/proposta.model';
import { PropostasService } from '../shared/services/propostas.service';

@Component({
  selector: 'app-propostas',
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css']
})
export class PropostasComponent implements OnInit {

  propostas: Proposta[];

  constructor(
    private propostasService: PropostasService) { }

  ngOnInit() {
    this.propostasService.getAll()
      .subscribe(propostas => {
        this.propostas = propostas;
        console.log(this.propostas);
      });
  }

}