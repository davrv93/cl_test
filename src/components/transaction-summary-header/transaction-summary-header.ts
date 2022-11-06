import { Component } from '@angular/core';
import { NavParams, Platform, ModalController } from '@ionic/angular';
import { SummaryRequest } from '../../models/summary/summary-request';

@Component({
  selector: 'transaction-summary-header',
  templateUrl: 'transaction-summary-header.html'
})
export class TransactionSummaryHeader {

  private summaryRequest: SummaryRequest;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ModalController) {
    this.summaryRequest = this.params.get('summaryRequest');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
