import { Component, ViewChild } from '@angular/core';
import {  Platform, AlertController } from '@ionic/angular';
import { NavController } from  '@ionic/angular';
import { StatusBar} from '@ionic-native/status-bar';
import { GooglePlus} from '@ionic-native/google-plus';
import { SplashScreen} from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { PropertiesPage } from '../pages/properties/properties';
import { TransactionSummaryPage } from '../pages/transaction-summary/transaction-summary';
import { AuthProvider } from '../providers/auth.provider';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrls: ['app.scss'],
  providers: [Storage, AuthProvider]

})



/**
 * @author rodrigo.reyes@kastor.cl
 */
export class MyApp {

  private storage: Storage;
  private authProvider: AuthProvider;

  rootPage: any = LoginPage;
  profile: any;

  page: {
    icon: string,
    title: string,
    component: any
  };

  pages: Array<{
    icon: string,
    title: string,
    component: any
  }>;

  /**
   *
   * @param platform
   * @param storage
   * @param auth
   */
  constructor(public platform: Platform, storage: Storage, authProvider: AuthProvider, public alertCtrl: AlertController) {
    this.initializeApp();
    this.storage = storage;
    this.authProvider = authProvider;

    this.page = {
      icon: '',
      title: 'Kastor',
      component: null
    };

    this.pages = [
      { icon: 'ios-person-outline', title: 'Mis Datos', component: ProfilePage },
      { icon: 'ios-home-outline', title: 'Inmuebles', component: PropertiesPage },
      { icon: 'ios-list-outline', title: 'Mis Movimientos', component: TransactionSummaryPage }
      /**,
       { icon: 'clipboard', title: 'Mis Solicitudes', component: ApplicationsPage }**/
    ];
  }

  /**
   *
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.create();
      this.storage.get('profile').then((profile) => {
        if (profile) {
          //this.nav.setRoot(PropertiesPage);
        } else {
          //this.nav.setRoot(LoginPage);
        }
      });

      StatusBar.backgroundColorByHexString('#f8aa5f');
      SplashScreen.hide();

    });
  }

  showAlert(title: string, message: string, button: string) {
    let alert = this.alertCtrl.create({
      //title: title,
      message: message,
      buttons: [button]
    });
    //alert.present();
  }

  /**
   *
   * @param page
   */
  openPage(page) {
    //this.nav.setRoot(page.component);
  }

  /**
   * Logout method
   */
  logout() {
    this.storage.get('profile').then((profile) => {
      if (profile.provider === 'google') {
        console.log('logout google');
        GooglePlus.logout()
          .then(function (response) {
            this.storage.remove('profile').then(() => {
              console.log('google logout');
              this.nav.setRoot(LoginPage, {}, {
                animate: true, direction: 'back'
              });
            });
          }, function (error) {
            console.log(error);
          });
      } else {
        this.authProvider.localLogout(profile.token).subscribe(
          data => {
            
            this.storage.remove('profile').then(() => {
              /*
              console.log('local logout');
              this.nav.setRoot(LoginPage, {}, {
                animate: true, direction: 'back'
              });*/
            });
          },
          err => {
            this.storage.remove('profile').then(() => {
              console.log('local logout error remove profile');
              /* 
              this.nav.setRoot(LoginPage, {}, {
                animate: true, direction: 'back'
              });*/
            });
            console.log(JSON.stringify(err));
          });
      }
    });

  }
}
