import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountComponent } from './account/account.component';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './shared/services/auth.service';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AccountLoginComponent,
    AccountComponent,
    AccountRegisterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,    
    AppRoutingModule
  ],
  providers: [
    FormBuilder,
    AuthGuard,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
