import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormBankComponent } from './pages/form-bank/form-bank.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: FormBankComponent },
  { path: ':id', component: FormBankComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule { }
