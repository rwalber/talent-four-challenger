import { NgModule } from '@angular/core';
import { DashboardComponent } from './page/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
      { path: 'banks', loadChildren: () => import('../banks/banks.module').then(m => m.BanksModule) },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
