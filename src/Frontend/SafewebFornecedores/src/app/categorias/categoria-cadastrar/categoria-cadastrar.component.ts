import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriasService } from '../../shared/services/categorias.service';
import { Router } from '@angular/router';
import { Categoria } from '../models/categoria.model';
import { NotificationErrorsService } from '../../shared/services/notification-errors.service';
import { MensagemFormulario } from '../../shared/consts';

@Component({
  selector: 'app-categoria-cadastrar',
  templateUrl: './categoria-cadastrar.component.html',
  styleUrls: ['./categoria-cadastrar.component.css']
})
export class CategoriaCadastrarComponent implements OnInit {

  categoriaForm: FormGroup;

  constructor(
    private categoriasService: CategoriasService,
    private fb: FormBuilder,
    private router: Router,
    private errorsService: NotificationErrorsService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.categoriaForm = this.fb.group({
      descricao: ['', Validators.required],
    });
  }

  get descricao() { return this.categoriaForm.get('descricao'); }

  prepareToSave(): Categoria {
    const formModel = this.categoriaForm.value;

    const categoriaModel: Categoria = {
      Descricao: formModel.descricao
    };
    return categoriaModel;
  }

  onSubmit() {    
    if (this.categoriaForm.invalid) {
      this.errorsService.notify([MensagemFormulario]);
    }
    else {
      let categoria = this.prepareToSave();
      this.categoriasService.post(categoria)
        .subscribe(res => {
          this.router.navigate(['/categorias']);
        });
    }
  }





}
