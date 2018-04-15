import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../shared/services/categorias.service';
import { Categoria } from './models/categoria.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[];

  constructor(
    private categoriasService: CategoriasService) { }

  ngOnInit() {
    this.categoriasService.getAll()
      .subscribe(categorias => this.categorias = categorias)
  }

}
