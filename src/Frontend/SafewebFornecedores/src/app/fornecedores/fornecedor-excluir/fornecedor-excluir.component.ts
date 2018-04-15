import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../models/fornecedor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedoresService } from '../../shared/services/fornecedores.service';

@Component({
  selector: 'app-fornecedor-excluir',
  templateUrl: './fornecedor-excluir.component.html',
  styleUrls: ['./fornecedor-excluir.component.css']
})
export class FornecedorExcluirComponent implements OnInit {

  fornecedor: Fornecedor;
  constructor(
    private route: ActivatedRoute,
    private fornecedoresServices: FornecedoresService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fornecedoresServices.get(this.route.snapshot.params['id'])
      .subscribe(fornecedor => this.fornecedor = fornecedor);
  }

  excluir() {
    this.fornecedoresServices.delete(this.route.snapshot.params['id'])
      .subscribe(res => this.router.navigate(['/fornecedores']));
  }
}
