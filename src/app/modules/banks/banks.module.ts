import { NgModule } from '@angular/core';
import { Interceptor } from 'src/app/interceptors/authenticated.interceptor.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { FormBankComponent } from './pages/form-bank/form-bank.component';
import { BanksRoutingModule } from './banks-routing.module';
import { DeleteBankComponent } from './components/delete-bank/delete-bank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    FormBankComponent,
    DeleteBankComponent
  ],
  imports: [
    FormsModule,
    Interceptor,
    CommonModule,
    BanksRoutingModule,
    ReactiveFormsModule,
  ]
})
export class BanksModule { }
