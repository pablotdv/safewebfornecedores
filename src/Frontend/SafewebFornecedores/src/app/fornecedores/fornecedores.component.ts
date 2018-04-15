import { Component, OnInit } from '@angular/core';
import { FornecedoresService } from '../shared/services/fornecedores.service';
import { Fornecedor } from './models/fornecedor.model';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  fornecedores: Fornecedor[];

  constructor(
    private fornecedoresService: FornecedoresService) { }

  ngOnInit() {
    this.fornecedoresService.getAll()
      .subscribe(fornecedores => this.fornecedores = fornecedores)
  }

}
