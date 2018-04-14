import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { routing } from './account.routing';
import { UserService } from '../shared/services/user.service';

@NgModule({
  imports: [
    CommonModule, routing, FormsModule,    
    ReactiveFormsModule
  ],
  declarations: [RegisterComponent],
  providers: [UserService]
})
export class AccountModule { }
