import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { AppAvailability } from '@awesome-cordova-plugins/app-availability/ngx';

import { Debt } from '../../models/debt.model';
import { DebtService } from '../../services/debt.service';
import { PaymentService } from '../../services/payment.service';
import { AppPage } from '../../app/app.page';
import { ConfigProvider } from '../../providers/config.provider';
import { Credit } from '../../models/payment.model';
import { StorageService } from 'src/services/storage.service';
/*
 Generated class for the CheckoutDebt page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-checkout-debt',
  templateUrl: 'checkout-debt.html',
  providers: [DebtService, PaymentService, ConfigProvider, AppAvailability, NavParams]
})
export class CheckoutDebtPage extends AppPage {

  private debts: Debt[] = [];
  private credit: Credit;
  private selectedDebts: Debt[] = [];
  private paymentMethodConfig: any;
  private propertyRequest: any;
  private checkout: {
    amount: number,
    credit: number,
    subtotal: number,
    total: number,
    fee: number
  };
  private storage: StorageService

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private debtService: DebtService, private paymentService: PaymentService,
              private appAvailability: AppAvailability, private platform: Platform,
              storage: StorageService,

              alertCtrl: AlertController, loadingCtrl: LoadingController, 
              ) {

    super(alertCtrl, loadingCtrl);
    this.storage = storage;
    this.page = { title: 'Deudas disponibles para pago' };
    this.propertyRequest =     this.storage.get('propertyRequest').then( value => {
      console.log(value);
      this.propertyRequest = value;
      });
    this.paymentMethodConfig =     this.storage.get('paymentMethodConfig').then( value => {
      console.log(value);
      this.paymentMethodConfig = value;
      });


    this.resetCheckout();
    this.platform.ready().then(() => {
      this.platform.resume.subscribe(() => {
        this.ionViewDidLoad();
      });
    });
  }

  ionViewDidLoad() {
    this.startLoader();
    this.resetCheckout();
    this.getCredit();
    this.getByYearMonth();
  }

  resetCheckout(): void {
    this.selectedDebts = [];
    this.checkout = { credit: 0, subtotal: 0, total: 0, fee: 0, amount: 0 };
  }

  getCredit(): void {
    this.paymentService.getCredit(this.propertyRequest)
      .then(credit => {
        console.log(credit);
        this.credit = credit;
        this.checkout.fee = this.paymentMethodConfig.khipu.khipu_comision || 0;
        this.checkout.credit = this.credit.abono || 0;
      })
      .catch(this.handleError);
  }

 
  getByYearMonth(): void {
    this.debtService.getByYearMonth(this.propertyRequest)
      .then(data => {
        this.debts = data;
        this.loading.dismiss();
      })
      .catch(this.handleError);
  }

  updateDebt(debt: Debt): void {
    if (debt.checked) {
      this.selectedDebts.push(debt);
      this.checkout.amount += +debt.saldo;
    } else {
      this.selectedDebts = this.selectedDebts.filter(h => h.id !== debt.id);
      this.checkout.amount -= +debt.saldo;
    }
    this.checkout.subtotal = (+this.checkout.amount > 0) ? +this.checkout.amount - +this.checkout.credit : 0;
    let total = +this.checkout.subtotal + +this.checkout.fee;
    this.checkout.total = (+this.checkout.subtotal > 0) ? total : 0;
  }

  payWithKhipu(): void {
    this.startLoader();
    console.log(this.selectedDebts);
    let deudasDetalle = [];
    this.selectedDebts.map(d => {
      return deudasDetalle.push(...d.detalle);
    });

    let payload = {
      total_abonos: this.checkout.credit,
      total_deudas: this.checkout.total,
      abonos: this.credit.detalle,
      deudas: deudasDetalle
    };
    console.log(payload);
    this.paymentService.getKhipuTransactionURL(this.propertyRequest, payload)
      .then(data => {
        let app;

        if (this.platform.is('ios')) {
          console.log('ios');
          app = 'khipu://';
        } else if (this.platform.is('android')) {
          console.log('android');
          app = 'com.khipu.android';
        }

        this.appAvailability.check(app)
          .then(yes => {
            window.open(data.app_url, '_system', 'location=no');
            console.log(yes);
            console.log('app open');
            this.loading.dismiss();
          }).catch(no => {
            window.open(data.payment_url, '_system', 'location=no');
            console.log(no);
            console.log('window open');
            this.loading.dismiss();
          });
      })
      .catch(this.handleError);
  }
}
