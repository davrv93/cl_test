import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {   NavController, LoadingController, NavParams, AlertController } from '@ionic/angular';
import { PropertyProvider } from '../../providers/property.provider';
import { ConfigProvider } from '../../providers/config.provider';
import { PropertyRequest } from '../../models/property-request';
import { ErrorMessageModel } from '../../models/error-message.model';
import { CheckoutDebtPage } from '../checkout-debt/checkout-debt';
import { AppPage } from '../../app/app.page';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'page-property-detail',
  templateUrl: 'property-detail.html',

  providers: [Storage, PropertyProvider, ConfigProvider, NavParams]
})
export class PropertyDetailPage extends AppPage {

  private propertyProvider: PropertyProvider;
  private configProvider: ConfigProvider;
  private storage: StorageService
  private propertyRequest: PropertyRequest = new PropertyRequest();

  private alicuotaInmueble: any;
  private usuarioInmueble: any;
  private propertyParam: any;
  private ultimoProrrateo: any;
  private montoProrrateo: any;
  private deudaInmueble: any;
  private ultimoPagoInmueble: any;
  private arriendoInstalacionesInmueble: any;
  private sumaDeudaInmueble: number;

  private errorMessage: ErrorMessageModel = new ErrorMessageModel();
  private genericErrorMessage: string;

  private actualDate: Date;

  profile: any;
  units: Array<any>;
  cobrosAdicionales: Array<any>;
  fondos: Array<any>;
  paymentMethodConfig: any;

  constructor(public navCtrl: NavController,
              loadingCtrl: LoadingController,
              alertCtrl: AlertController,
              public navParams: NavParams,
              private route:ActivatedRoute,
              storage: StorageService,
              private router: Router,

              propertyProvider: PropertyProvider,
              configProvider: ConfigProvider ) {

    super(alertCtrl, loadingCtrl);
    this.storage = storage;
    this.propertyProvider = propertyProvider;
    this.configProvider = configProvider;
    this.page = { title: 'Detalle de Inmueble' };
    this.propertyParam =     this.storage.get('property').then( value => {
      console.log(value);
        this.propertyRequest.set({
          idComunidad:  value.idComunidad,
          idAdministrador: value.idAdministrador,
          idInmueble: value.idInmueble,
          anio: +moment().format('YYYY'),
          mes: +moment().format('MM'),
          fecha: moment().format('YYYYMMDD'),
          periodo: moment().format('YYYYMM')
      });
    console.log(this.propertyParam.idComunidad);


    });
    this.actualDate = new Date();
    this.montoProrrateo =
      [{ valor_deuda_unidad: 0 }];

   

    this.genericErrorMessage = 'Se ha producido un error al procesar la información del Inmueble';

    this.startLoader();
  }

  ionViewDidLoad() {
 
  }

  ionViewDidEnter() {
    console.log('yeah')
    this.montoProrrateoByInmueble();
    this.ultimoProrrateoByComunidad();
    this.usuarioByInmueble();
    this.ultimoPagoByInmueble();
    this.totalDeudaByInmueble();
    //this.loadingCtrl.dismiss();
  }

  isEmptyObject(obj) {
    return _.isEmpty(obj);
  }


  payDebt() {
    this.storage.set('paymentMethodConfig',this.paymentMethodConfig);

      this.storage.set('propertyRequest',this.propertyRequest);

    this.router.navigate(['/checkout-debt',{}])


   /* this.nav.push(CheckoutDebtPage, {
      paymentMethodConfig: this.paymentMethodConfig[0],
      propertyRequest: this.propertyRequest
    }, {
      animate: true, direction: 'front'
    });*/
  }

  /**
   * obtiene un objeto con los datos del ultimo prorrateo por inmueble
   */
  montoProrrateoByInmueble() {
    this.propertyProvider.montoProrrateoByInmueble(this.propertyRequest).subscribe(
      montoProrrateo => this.montoProrrateo = montoProrrateo,
      this.handleError
    );
  }

  /**
   * obtiene la informacion de el ultimo prorrateo por comunidad
   */
  ultimoProrrateoByComunidad() {
    this.propertyProvider.ultimoProrrateoByComunidad(this.propertyRequest).subscribe(
      ultimoProrrateo => this.ultimoProrrateo = ultimoProrrateo,
      this.handleError
    );
  }

  /**
   *  obtiene el total de la alicuota por inmueble
   */
  alicuotaByInmueble() {
    this.propertyProvider.alicuotaByInmueble(this.propertyRequest).subscribe(
      alicuotaInmueble => this.alicuotaInmueble = alicuotaInmueble,
      this.handleError
    );
  }

  /**
   * obtiene el usuario asociado al inmueble
   */
  usuarioByInmueble() {
    this.propertyProvider.usuarioByInmueble(this.propertyRequest).subscribe(
      usuarioInmueble => this.usuarioInmueble = usuarioInmueble,
      this.handleError
    );
  }

  /**
   * obtiene un objeto con los datos del ultimo prorrateo por inmueble
   */
  ultimoPagoByInmueble() {
    this.propertyProvider.ultimoPagoByInmueble(this.propertyRequest).subscribe(
      ultimoPagoInmueble => this.ultimoPagoInmueble = ultimoPagoInmueble,
      this.handleError
    );
  }

  /**
   * obtiene el total de arriendos y deudas de instalaciones para el inmueble
   */
  totalDeudaByInmueble() {
    this.propertyProvider.totalArriendoInstalacionesByInmueble(this.propertyRequest).subscribe(
      arriendoInstalacionesInmueble => {
        this.arriendoInstalacionesInmueble = arriendoInstalacionesInmueble;
        this.propertyProvider.deudaByInmueble(this.propertyRequest).subscribe(
          deudaInmueble => {
            this.deudaInmueble = deudaInmueble;
            let deuda = +this.deudaInmueble[0].deuda;
            let arriendos = +this.arriendoInstalacionesInmueble[0].total_arriendo;
            this.sumaDeudaInmueble = (arriendos + deuda);
            this.paymentMethodConfigByComunidad();
          },
          this.handleError
        );
      },
      this.handleError
    );
  }

  paymentMethodConfigByComunidad() {
    this.configProvider.paymentMethodConfigByComunidad(this.propertyRequest).subscribe(
       config => {this.paymentMethodConfig =  config},
      this.handleError
    );
  }


  /**
   *
   * @param message
   * @param status
   */
  buildErrorMessage(message: string, status: number) {
    this.errorMessage.set({
      showMessage: true,
      statusCode: status,
      name: 'Error',
      message: message,
      icon: 'assets/images/error-icon.png'
    });
    //this.loadingCtrl.dismiss();
  }


}
