import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfiguracoesService } from '../shared/services/configuracoes.service';
import { Router } from '@angular/router';
import { Configuracao } from './models/configuracao.model';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {

  configuracaoForm: FormGroup;
  errors: string[] = [];

  constructor(
    private configuracoesService: ConfiguracoesService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.configuracoesService.get()
      .subscribe(configuracao => {
        this.createForm(configuracao);
      });
  }

  createForm(configuracao: Configuracao) {
    this.configuracaoForm = this.fb.group({
      tempoProposta: [configuracao.TempoProposta, Validators.required],
      configuracaoId: [configuracao.ConfiguracaoId]
    });
  }

  get tempoProposta() { return this.configuracaoForm.get('tempoProposta'); }

  prepareToSave(): Configuracao {
    const formModel = this.configuracaoForm.value;

    const configuracaoModel: Configuracao = {
      TempoProposta: formModel.tempoProposta,
      ConfiguracaoId: formModel.configuracaoId
    };
    return configuracaoModel;
  }

  onSubmit() {
    this.errors = [];

    let configuracao = this.prepareToSave();

    this.configuracoesService.put(configuracao)
      .subscribe(res => {
        this.router.navigate(['/configuracoes']);
      }, error => {
        if (this.configuracoesService.modelStateErrors && this.configuracoesService.modelStateErrors.length > 0) {
          this.errors = this.configuracoesService.modelStateErrors;
        }
        else {
          console.log(error);
        }
      });
  }
}
