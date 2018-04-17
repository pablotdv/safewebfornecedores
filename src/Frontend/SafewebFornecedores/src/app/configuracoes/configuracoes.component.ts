import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfiguracoesService } from '../shared/services/configuracoes.service';
import { Router } from '@angular/router';
import { Configuracao } from './models/configuracao.model';
import { MensagemFormulario } from '../shared/consts';
import { NotificationErrorsService } from '../shared/services/notification-errors.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {

  configuracaoForm: FormGroup;

  constructor(
    private configuracoesService: ConfiguracoesService,
    private fb: FormBuilder,
    private router: Router,
    private errorsService: NotificationErrorsService
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
    if (this.configuracaoForm.invalid) {
      this.errorsService.notify([MensagemFormulario]);
    }
    else {
      let configuracao = this.prepareToSave();
      this.configuracoesService.put(configuracao)
        .subscribe(res => {
          this.router.navigate(['/configuracoes']);
        });
    }
  }
}
