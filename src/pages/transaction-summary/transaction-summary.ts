import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SummaryRequest } from '../../models/summary/summary-request';
import { PropertyProvider } from '../../providers/property.provider';
import { AppPage } from '../../app/app.page';
import * as moment from 'moment';
import * as _ from 'lodash';

/* Modal child components*/
import { TransactionSummaryDebtPage } from '../transaction-summary-debt/transaction-summary-debt';
import { TransactionSummaryPaymentsPage } from '../transaction-summary-payments/transaction-summary-payments';

/**
 * @author rodrigo.reyes@kastor.cl
 */
@Component({
  selector: 'page-transaction-summary',
  templateUrl: 'transaction-summary.html',
  providers: [Storage, PropertyProvider]
})
export class TransactionSummaryPage extends AppPage {

  private summaryRequest: SummaryRequest;
  private propertyProvider: PropertyProvider;
  private storage: Storage;

  properties: Array<any>;
  profile: any;

  page: {
    title: string,
    component: any
  };

  pages: Array<{
    icon: string,
    title: string,
    component: any
  }>;

  selectOptions: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public modalCtrl: ModalController, propertyProvider: PropertyProvider, storage: Storage, public alertCtrl: AlertController) {
    super(alertCtrl, loadingCtrl);
    this.page = { title: 'Mis Movimientos', component: TransactionSummaryPage };

    this.pages = [
      { icon: '', title: 'Ver Cobros', component: TransactionSummaryDebtPage },
      { icon: '', title: 'Ver Pagos', component: TransactionSummaryPaymentsPage }
    ];

    this.summaryRequest = { dateFrom: moment().subtract(1, 'month').format('YYYY-MM-DD'), dateTo: moment().format('YYYY-MM-DD') };

    this.storage = storage;
    this.propertyProvider = propertyProvider;

    this.startLoader();

    this.selectOptions = {
      title: '',
      subTitle: 'Seleccione Inmueble'
    };
  }

  ionViewDidLoad() {
    this.loadPropertiesByEmail();
  }

  loadPropertiesByEmail() {
      this.storage.get('profile').then((profile) => {
        this.profile = profile;
        let propertyProvider = this.propertyProvider;
        this.propertyProvider.propertiesAndRolByEmail(profile.email, profile.token).subscribe(
          async properties => {
            this.properties = await properties.json();
            _.forEach(this.properties, function (property) {
              let prop = property;
              propertyProvider.comunidadById(prop.idComunidad, prop.idAdministrador).subscribe(
                comunidad => {
                  property.comunidad = comunidad;
                },
                err => {
                  console.log(JSON.stringify(err));
                  this.loading.dismiss();
                });
            });
            this.loading.dismiss();
          },
          err => {
            console.log(JSON.stringify(err));
            this.loading.dismiss();
          });
      });
  }

  showAlert(title: string, message: string, button: string) {
    let alert = this.alertCtrl.create({
      message: message,
      buttons: [button]
    });
    //alert.present();
  }

  presentModal(component: any) {
    if (!this.summaryRequest.inmueble) {
      this.showAlert('Mis movimientos', 'Para visualizar tus movimientos debes seleccionar un inmueble', 'ACEPTAR');
      return false;
    }
    //let modal = this.modalCtrl.create(component, { summaryRequest: this.summaryRequest });
   //modal.present();
  }

}
