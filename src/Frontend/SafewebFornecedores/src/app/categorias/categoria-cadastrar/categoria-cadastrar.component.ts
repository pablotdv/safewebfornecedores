import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriasService } from '../../shared/services/categorias.service';
import { Router } from '@angular/router';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categoria-cadastrar',
  templateUrl: './categoria-cadastrar.component.html',
  styleUrls: ['./categoria-cadastrar.component.css']
})
export class CategoriaCadastrarComponent implements OnInit {

  categoriaForm: FormGroup;
  errors: string[] = [];

  constructor(
    private categoriasService: CategoriasService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.categoriaForm = this.fb.group({
      descricao: ['123123', Validators.required],      
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
    this.errors = [];

    let categoria = this.prepareToSave();

    console.log(categoria);
    this.categoriasService.post(categoria)
      .subscribe(res => {
        this.router.navigate(['/categorias']);
      }, error => {
        if (this.categoriasService.modelStateErrors && this.categoriasService.modelStateErrors.length > 0) {
          this.errors = this.categoriasService.modelStateErrors;
        }
        else {
          console.log(error);
        }
      });
  }





}
