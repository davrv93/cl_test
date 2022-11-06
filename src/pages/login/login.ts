import { Component } from '@angular/core';
import { StatusBar} from '@ionic-native/status-bar';
import { GooglePlus} from '@ionic-native/google-plus';
import { SplashScreen} from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {  ModalController, LoadingController, NavController, NavParams,  AlertController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile';
import { PropertiesPage } from '../properties/properties';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { Credentials } from '../../models/credentials.model';
import { AuthProvider } from '../../providers/auth.provider';
import {Router} from "@angular/router"

import { RESET_PASSWORD_URL } from '../../app/constants';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Storage, AuthProvider, NavParams]
})

/**
 * @author rodrigo.reyesco@gmail.com
 */
export class LoginPage {
  private storage: Storage;
  private authProvider: AuthProvider;
  private loginForm: FormGroup;
  private resetPasswordUrl: string;

  credentials: Credentials = new Credentials();
  pages: Array<{ title: string, component: any }>;

  /**
   * Constructor
   * @param navCtrl
   * @param navParams
   * @param nav
   * @param loadingCtrl
   * @param alertCtrl
   * @param appCtrl
   * @param viewCtrl
   * @param formBuilder
   * @param storage
   * @param auth
   */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public viewCtrl: ModalController,
    private formBuilder: FormBuilder,
    storage: Storage,
    private router: Router,
    authProvider: AuthProvider) {

    this.storage = storage;
    this.authProvider = authProvider;
    this.resetPasswordUrl = RESET_PASSWORD_URL;

    this.credentials.email = this.navParams.get('email');

    this.pages = [
      { title: 'Mis Datos', component: ProfilePage },
      { title: 'Mis Propiedades', component: PropertiesPage }
    ];

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required,
      Validators.minLength(4)])
    });
    this.storage.create();
    this.storage.get('email').then((email) => {
      this.credentials.email = email;
    });

  }

  /**
   *
   */
  openResetPassword() {
   /* this.nav.push(ResetPasswordPage, { email: this.loginForm.get('email').value }, {
      animate: true, direction: 'front'
    });*/
  }

  /**
   *
   * @param page
   */
  openPage(page) {
    /*this.nav.setRoot(page.component, {}, {
      animate: true, direction: 'front'
    });*/
  }

  /**
   * Database Login
   */
  localLogin() {

    this.credentials.email = this.loginForm.get('email').value || this.navParams.get('email');
    this.credentials.password = this.loginForm.get('password').value;

    this.storage.set('email', this.credentials.email).then((data) => {
      console.log('email stored');
    });

    let loading = this.loadingCtrl.create({
      message: 'Cargando...'
    });

   // loading.present();

    this.authProvider.localLogin(this.credentials.email, this.credentials.password)
    
      .subscribe(
       data => {
        let result =  data;
        console.log(result);
        this.authProvider.storeLocalAccessToken(result['id']);
        this.authProvider.findUserById(result['userId'], result['id']).subscribe(
           user => {
            this.storage.remove('profile').then(() => {
              console.log('removing profile');
            });
            let resultData =  result;
            this.storage.set('profile', {
              provider: 'local',
              token: result['id'],
              userId: resultData['userId'],
              userName: this.credentials.email,
              password: this.credentials.password,
              name: resultData['name'],
              lastName: resultData['lastName'],
              motherLastName: resultData['motherLastName'],
              email: resultData['email'],
              roles: resultData['roles'],
              picture: 'assets/images/profile_1.png'
            }).then((data) => {
              console.log('creating profile ' + JSON.stringify(data));
              this.router.navigate(['/properties'])

             /* this.nav.setRoot(PropertiesPage, {}, {
                animate: true, direction: 'front'
              });*/
              //loading.dismiss();
            });
          },
          err => {
            console.log('error!: ', err);
            //loading.dismiss();
          }
        );
      },
      err => {
        if (err.status === 401) {
          this.showAlert('Login', 'El usuario o password es incorrecto', 'ACEPTAR');
         // this.nav.setRoot(LoginPage, { email: this.loginForm.get('email').value });
        } else if (err.status === 0) {
          this.showAlert('Problemas de conexión!', 'Tu comunidad en línea necesita conexión a internet!', 'ACEPTAR');
          //this.nav.setRoot(LoginPage, { email: this.loginForm.get('email').value });
        } else if (err.status !== 200) {
          this.showAlert('Login', 'Se ha producido un error en la aplicación', 'ACEPTAR');
          //this.nav.setRoot(LoginPage, { email: this.loginForm.get('email').value });
        } else {
          this.showAlert('Login', 'Se ha producido un error en la aplicación', 'ACEPTAR');
          //this.nav.setRoot(LoginPage, { email: this.loginForm.get('email').value });
        }
        console.log('error!: ', err);
        //loading.dismiss();
      });

  }

  /**
   * Google Login
   */
  googleLogin() {
    //let nav = this.nav;
    let storage = this.storage;
    let loading = this.loadingCtrl.create({
      message: 'Cargando...'
    });
    //loading.present();
    this.storage.remove('profile');
    GooglePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '946720883795-4qpterh59hmiot9j2hoitid9s5bdfsgm.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
      .then(function (user) {
        //loading.dismiss();
        console.log('google login ' + JSON.stringify(user));
        storage.set('profile', {
          provider: 'google',
          name: user.displayName,
          email: user.email,
          picture: user.imageUrl
        });
       // nav.setRoot(ProfilePage);
      }, function (error) {
        console.log(error);
        //loading.dismiss();
      });

  }

  /**
   * Show Alert method
   * @param title
   * @param message
   * @param button
   */
  showAlert(title: string, message: string, button: string) {
    let alert = this.alertCtrl.create({
      //title: title,
      message: message,
      buttons: [button]
    });
    //alert.present();
  }

}
