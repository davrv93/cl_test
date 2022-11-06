import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { Credentials } from '../../models/credentials.model';
import { ErrorMessageModel } from '../../models/error-message.model';
import { AuthProvider } from '../../providers/auth.provider';
import { AppPage } from '../../app/app.page';

/**
 * @author rodrigo.reyes@kastor.cl
 * @since 15-03-2017
 */
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
  providers: [AuthProvider]
})
export class ResetPasswordPage extends AppPage {
  private resetPasswordForm: FormGroup;
  private authProvider: AuthProvider;
  errorMessage: ErrorMessageModel = new ErrorMessageModel();
  showConfirmation: boolean;
  showError: boolean;
  credentials: Credentials = new Credentials();
  page: {
    title: string,
    component: any
  };

  /**
   *
   * @param navCtrl
   * @param navParams
   * @param loadingCtrl
   * @param auth
   */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              loadingCtrl: LoadingController,
              alertCtrl: AlertController,
              authProvider: AuthProvider) {

    super(alertCtrl, loadingCtrl);

    this.credentials.email = this.navParams.get('email');
    this.page = { title: 'Restablecer contraseña', component: ResetPasswordPage };
    this.showConfirmation = false;
    this.showError = false;
    this.authProvider = authProvider;

    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])
    });

  }

  /**
   *
   */
  ionViewDidLoad() {
  }

  /**
   *
   */
  confirmResetPassword() {
    let confirm = this.alertCtrl.create({
      //title: '¿Restablecer clave?',
      message: 'Enviaremos un email a ' + this.credentials.email + ' con las instrucciones para restablecer tu clave.',
      buttons: [
        {
          text: 'CANCELAR',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ACEPTAR',
          handler: () => {
            this.resetPassword();
          }
        }
      ]
    });
    //confirm.present();
  }


  /**
   * Controller Method to Request send mail with reset password options
   */
  resetPassword() {
    this.startLoader();
    this.authProvider.resetPassword(this.credentials.email).subscribe(
      data => {
        this.showConfirmation = true;
        this.errorMessage.showMessage = false;
        this.loading.dismiss();
      },
      err => {
        console.log(JSON.stringify(err));
        this.showConfirmation = false;
        if (err.status === 404) {
          this.errorMessage.set({
            showMessage: true,
            statusCode: 404,
            name: 'Error',
            message: 'El email ingresado no fue encontrado',
            icon: 'assets/images/error-icon.png'
          });
        }
        this.loading.dismiss();
      });
  }


}
