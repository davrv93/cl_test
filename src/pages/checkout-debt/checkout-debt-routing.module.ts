import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutDebtPage } from './checkout-debt';

const routes: Routes = [
  {
    path: '',
    component: CheckoutDebtPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutDebtRoutingModule {}
