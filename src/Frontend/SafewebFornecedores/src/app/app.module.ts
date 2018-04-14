import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { NgBrToolsModule } from 'ng-br-tools';

import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { HomeComponent } from './home/home.component';
import { ConfigService } from './shared/services/config.service';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AccountModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgBrToolsModule
  ],
  providers: [ConfigService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
