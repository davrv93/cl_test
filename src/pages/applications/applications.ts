import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ApplicationDetailPage } from '../application-detail/application-detail';

@Component({
  selector: 'page-applications',
  templateUrl: 'applications.html'
})
export class ApplicationsPage {

  page: {
    title: string,
    component: any
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              ) {
    this.page = { title: 'Mis Solicitudes', component: ApplicationsPage };
  }

  detail() {
   /*
    this.nav.push(ApplicationDetailPage, {}, {
      animate: true, direction: 'front'
    });*/
  }

}
