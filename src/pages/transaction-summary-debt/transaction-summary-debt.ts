import { Component } from '@angular/core';
import { NavParams, Platform, ModalController, LoadingController, AlertController } from  '@ionic/angular';
import { AppPage } from '../../app/app.page';
import { SummaryRequest } from '../../models/summary/summary-request';
import { TransactionSummaryProvider } from '../../providers/transaction-summary-provider';

@Component({
  selector: 'page-transaction-summary-debt',
  templateUrl: 'transaction-summary-debt.html',
  providers: [TransactionSummaryProvider]
})
export class TransactionSummaryDebtPage extends AppPage {

  private transactionSummaryProvider: TransactionSummaryProvider;
  private summaryRequest: SummaryRequest;
  private cartolaDeuda: any;
  private saldoCartola: any;
  private totalCartola: any;

  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ModalController,
    public loadingCtrl: LoadingController,
    transactionSummaryProvider: TransactionSummaryProvider,
    alertCtrl: AlertController) {

    super(alertCtrl, loadingCtrl);
    this.transactionSummaryProvider = transactionSummaryProvider;
    this.summaryRequest = this.params.get('summaryRequest');
  }

  ionViewDidLoad() {
    this.getCartolaDeudaByInmueble();
    this.getSaldoCartolaByInmueble();
  }

  getCartolaDeudaByInmueble() {
    this.startLoader();
    this.transactionSummaryProvider.getCartolaDeudaByInmueble(this.summaryRequest).subscribe(
      cartola => {
        //this.totalCartola =   cartola.pop();
        this.cartolaDeuda = cartola;
        this.loading.dismiss();
      },
      err => {
        console.log(JSON.stringify(err));
        this.loading.dismiss();
      });
  }

  getSaldoCartolaByInmueble() {
    this.transactionSummaryProvider.getSaldoCartolaByInmueble(this.summaryRequest).subscribe(
      saldo => {
        this.saldoCartola = saldo;
      },
      err => {
        console.log(JSON.stringify(err));
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
