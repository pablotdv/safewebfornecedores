import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';

import { NgBrToolsModule } from 'ng-br-tools';

import { RegisterComponent } from './register/register.component';
import { UserService } from '../shared/services/user.service';
import { TextMaskModule } from 'angular2-text-mask';
import { LoginComponent } from './login/login.component';
import { AccountService } from './shared/services/account.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './account/account.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,    
    ReactiveFormsModule, 
    TextMaskModule,
    NgBrToolsModule, 
    HttpClientModule,
    AccountRoutingModule
  ],
  declarations: [RegisterComponent, LoginComponent, AccountComponent],
  providers: [UserService, AccountService, HttpClient]
})
export class AccountModule { }
