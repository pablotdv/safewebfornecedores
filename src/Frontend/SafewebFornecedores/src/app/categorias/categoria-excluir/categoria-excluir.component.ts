import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from '../../shared/services/categorias.service';

@Component({
  selector: 'app-categoria-excluir',
  templateUrl: './categoria-excluir.component.html',
  styleUrls: ['./categoria-excluir.component.css']
})
export class CategoriaExcluirComponent implements OnInit {

  categoria: Categoria;
  constructor(
    private route: ActivatedRoute,
    private categoriasServices: CategoriasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoriasServices.get(this.route.snapshot.params['id'])
      .subscribe(categoria => this.categoria = categoria);
  }

  excluir() {
    this.categoriasServices.delete(this.route.snapshot.params['id'])
      .subscribe(res => this.router.navigate(['/categorias']));
  }
}
