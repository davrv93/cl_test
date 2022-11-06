import { LoadingController, AlertController } from '@ionic/angular';
import { SentryErrorHandler } from './sentry-errorhandler';

export abstract class AppPage extends SentryErrorHandler {

  loading: any;
  page: {
    title: string
  };

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    super();
  }

  abstract ionViewDidLoad();

  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);
    this.ionViewDidLoad();

    setTimeout(() => {
      // console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  startLoader() {
     this.loading = this.loadingCtrl.create({
      message: 'Cargando...'
    });

   // this.loading.present();
    // this.loading.dismiss();
  }

  handleError(error: any): void {
    super.handleError(error);
 
  }
}
