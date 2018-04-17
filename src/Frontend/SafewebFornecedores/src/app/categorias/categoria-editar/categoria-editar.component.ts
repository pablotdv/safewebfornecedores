import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriasService } from '../../shared/services/categorias.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria, CategoriaEditar } from '../models/categoria.model';
import { MensagemFormulario } from '../../shared/consts';
import { NotificationErrorsService } from '../../shared/services/notification-errors.service';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.css']
})
export class CategoriaEditarComponent implements OnInit {
  categoriaForm: FormGroup;

  constructor(
    private categoriasService: CategoriasService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private errorsService: NotificationErrorsService
  ) {
  }

  ngOnInit() {
    this.categoriasService.get(this.route.snapshot.params['id'])
      .subscribe(categoria => {
        this.createForm(categoria);
      });
  }

  createForm(categoria: Categoria) {
    this.categoriaForm = this.fb.group({
      descricao: [categoria.Descricao, Validators.required],
    });
  }

  get descricao() { return this.categoriaForm.get('descricao'); }

  prepareToSave(): CategoriaEditar {
    const formModel = this.categoriaForm.value;

    const categoriaModel: CategoriaEditar = {
      Descricao: formModel.descricao,
      CategoriaId: this.route.snapshot.params['id']
    };
    return categoriaModel;
  }

  onSubmit() {
    let categoria = this.prepareToSave();
    if (this.categoriaForm.invalid) {
      this.errorsService.notify([MensagemFormulario]);
    }
    else {
      this.categoriasService.put(categoria)
        .subscribe(res => {
          this.router.navigate(['/categorias']);
        });
    }
  }





}
