import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from 'src/pages/login/login';
import { CheckoutDebtRoutingModule } from './checkout-debt-routing.module';
import { CheckoutDebtPage } from './checkout-debt';
import { CurrencyFormat } from '../../pipes/currency-format';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutDebtRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [CheckoutDebtPage,CurrencyFormat ]
})
export class CheckoutDebtModule {}
