import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { routing } from './account.routing';
import { UserService } from '../shared/services/user.service';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule, routing, FormsModule,    
    ReactiveFormsModule, TextMaskModule
  ],
  declarations: [RegisterComponent],
  providers: [UserService]
})
export class AccountModule { }
