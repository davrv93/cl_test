import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'page-application-detail',
  templateUrl: 'application-detail.html'
})
export class ApplicationDetailPage {
  page: {
    title: string,
    component: any
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.page = { title: 'Detalle Solicitud', component: ApplicationDetailPage };
  }


}
