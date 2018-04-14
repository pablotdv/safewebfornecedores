import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { HomeComponent } from './home/home.component';
import { ConfigService } from './shared/services/config.service';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';


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
    ReactiveFormsModule  
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
