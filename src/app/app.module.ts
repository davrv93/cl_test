import { NgModule, ErrorHandler } from '@angular/core';
import { IonApp } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { CurrencyFormat } from '../pipes/currency-format';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { PropertyDetailPage } from '../pages/property-detail/property-detail';
import { CheckoutDebtPage } from '../pages/checkout-debt/checkout-debt';
import { TransactionSummaryPage } from '../pages/transaction-summary/transaction-summary';
import { TransactionSummaryDebtPage } from '../pages/transaction-summary-debt/transaction-summary-debt';
import { TransactionSummaryPaymentsPage } from '../pages/transaction-summary-payments/transaction-summary-payments';

import { TransactionSummaryHeader } from '../components/transaction-summary-header/transaction-summary-header';
 
import { ApplicationsPage } from '../pages/applications/applications';
import { ApplicationDetailPage } from '../pages/application-detail/application-detail';

import 'intl';
import 'intl/locale-data/jsonp/en';
import { SentryErrorHandler } from './sentry-errorhandler';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { LoginModule } from 'src/pages/login/login.module';


@NgModule({
  declarations: [
    MyApp,
    ResetPasswordPage,
    ProfilePage,
    EditProfilePage,
    CheckoutDebtPage,
    TransactionSummaryHeader,
    TransactionSummaryPage,
    TransactionSummaryDebtPage,
    TransactionSummaryPaymentsPage,
    ApplicationsPage,
    ApplicationDetailPage,
    CurrencyFormat
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    LoginModule,
    


   /* IonicModule.forRoot(MyApp, {
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      backButtonText: '',
      pageTransition: 'ios'
    }, {}*/
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [MyApp],
  entryComponents: [
    MyApp,
    ResetPasswordPage,
    ProfilePage,
    EditProfilePage,
    CheckoutDebtPage,
    TransactionSummaryHeader,
    TransactionSummaryPage,
    TransactionSummaryDebtPage,
    TransactionSummaryPaymentsPage,
    ApplicationsPage,
    ApplicationDetailPage
  ],
  providers: [Storage, { provide: ErrorHandler, useClass: SentryErrorHandler },{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }]
})

/**
 * @author rodrigo.reyes@kastor.cl
 */
export class AppModule { }
