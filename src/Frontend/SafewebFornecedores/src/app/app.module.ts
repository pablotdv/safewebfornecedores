import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { UsersComponent } from './users/users.component';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './shared/services/auth.service';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersService } from './shared/services/users.service';
import { TokenInterceptor } from './token.interceptor';
import { UserEditComponent } from './users/user-edit/user-edit.component';

import { NgBrToolsModule } from 'ng-br-tools';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AccountLoginComponent,
    UsersComponent,
    AccountRegisterComponent,
    UserEditComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
