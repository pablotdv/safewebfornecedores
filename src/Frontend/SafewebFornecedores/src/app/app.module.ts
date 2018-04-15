import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { NgBrToolsModule } from 'ng-br-tools';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './shared/services/auth.service';
import { UsersService } from './shared/services/users.service';
import { TokenInterceptor } from './token.interceptor';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDeleteComponent } from './users/user-delete/user-delete.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { MessagesComponent } from './shared/messages/messages.component';
import { NotificationService } from './shared/notification.service';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { FornecedoresService } from './shared/services/fornecedores.service';
import { FornecedorCadastrarComponent } from './fornecedores/fornecedor-cadastrar/fornecedor-cadastrar.component';
import { FornecedorEditarComponent } from './fornecedores/fornecedor-editar/fornecedor-editar.component';
import { FornecedorExcluirComponent } from './fornecedores/fornecedor-excluir/fornecedor-excluir.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaCadastrarComponent } from './categorias/categoria-cadastrar/categoria-cadastrar.component';
import { CategoriaEditarComponent } from './categorias/categoria-editar/categoria-editar.component';
import { CategoriaExcluirComponent } from './categorias/categoria-excluir/categoria-excluir.component';
import { CategoriasService } from './shared/services/categorias.service';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AccountLoginComponent,
    UsersComponent,
    UserEditComponent,
    UserDeleteComponent,
    UserRegisterComponent,
    MessagesComponent,
    FornecedoresComponent,
    FornecedorCadastrarComponent,
    FornecedorEditarComponent,
    FornecedorExcluirComponent,
    CategoriasComponent,
    CategoriaCadastrarComponent,
    CategoriaEditarComponent,
    CategoriaExcluirComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgBrToolsModule,
    TextMaskModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    FormBuilder,
    AuthGuard,
    AuthService,
    UsersService,
    { provide: LOCALE_ID, useValue: 'pt' },
    NotificationService,
    FornecedoresService,
    CategoriasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
