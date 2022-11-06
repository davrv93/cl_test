import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NavController, LoadingController, AlertController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProfileModel } from '../../models/profile.model';
import { UserModel } from '../../models/user-model.model';
import { ErrorMessageModel } from '../../models/error-message.model';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth.provider';
import { AppPage } from '../../app/app.page';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
  providers: [Storage, AuthProvider]
})

/**
 * @author rodrigo.reyes@kastor.cl
 */
export class EditProfilePage extends AppPage {
  private profileModel: ProfileModel = new ProfileModel();
  private userModel: UserModel = new UserModel();
  private editProfileForm: FormGroup;
  private errorMessage: ErrorMessageModel = new ErrorMessageModel();
  private showConfirmation: boolean;
  private authProvider: AuthProvider;
  private storage: Storage;

  page: {
    title: string,
    component: any
  };

  /**
   *
   * @param navCtrl
   * @param navParams
   * @param nav
   * @param loadingCtrl
   * @param alertCtrl
   * @param storage
   * @param auth
   */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              loadingCtrl: LoadingController,
              alertCtrl: AlertController,
              storage: Storage,
              authProvider: AuthProvider) {

    super(alertCtrl, loadingCtrl);
    this.storage = storage;
    this.authProvider = authProvider;

    this.page = { title: 'Editar mis Datos', component: EditProfilePage };

    this.editProfileForm = new FormGroup({
      email: new FormControl({ value: '', disabled: true }, [Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),

      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      motherLastName: new FormControl('', [Validators.required]),
      password: new FormControl('', []),
      confirm: new FormControl('', [])
    });

    this.startLoader();

      this.storage.get('profile').then((profile) => {
        this.setProfileModel(profile);
        this.loading.dismiss();
      });

  }

  ionViewDidLoad() {
  }

  /**
   *
   */
  editProfile() {
    this.startLoader();
    this.setUserModel(this.profileModel);
    this.authProvider.updateUser(this.profileModel.token, this.userModel).subscribe(
      user => {
        this.showConfirmation = true;
        this.errorMessage.showMessage = false;
        this.updateProfile(user);
        this.loading.dismiss();
      },
      err => {
        console.log(JSON.stringify(err));
        this.showConfirmation = false;
        this.errorMessage.set({
          showMessage: true,
          statusCode: 404,
          name: 'Error',
          message: 'Se ha producido un error al actualizar tus datos',
          icon: 'assets/images/error-icon.png'
        });
        this.loading.dismiss();
      });
  }

  /**
   *
   * @param token ∫
   */
  logoutLocal(token: string) {
    this.authProvider.localLogout(token).subscribe(
      data => {
        this.storage.remove('profile').then(() => {
          console.log('local logout');
          //this.nav.setRoot(LoginPage);
        });
      },
      err => {
        console.log(JSON.stringify(err));
      });
  }

  /**
   * Update profile storage and model
   * @param user
   */
  updateProfile(user: any) {
    this.storage.remove('profile').then(() => {
      console.log('removing profile for update');
    });
    this.storage.set('profile', {
      provider: 'local',
      token: this.profileModel.token,
      userId: user.userId,
      userName: user.username,
      password: this.profileModel.password,
      name: user.name,
      lastName: user.lastName,
      motherLastName: user.motherLastName,
      email: user.email,
      picture: 'assets/images/profile_1.png'
    }).then((profile) => {
      console.log('updating profile ' + JSON.stringify(profile));
      this.setProfileModel(profile);
    });
  }

  /**
   *
   * @param profileModel
   */
  setUserModel(profileModel: ProfileModel) {
    this.userModel.set({
      userId: profileModel.userId,
      email: profileModel.email,
      username: profileModel.userName,
      password: profileModel.password,
      name: profileModel.name,
      lastName: profileModel.lastName,
      motherLastName: profileModel.motherLastName
    });
  }

  /**
   * Set the profile model for view
   */
  setProfileModel(profile: any) {
    this.profileModel.set({
      userId: profile.userId,
      token: profile.token,
      emailVerified: true,
      provider: profile.provider,
      name: profile.name,
      lastName: profile.lastName,
      motherLastName: profile.motherLastName,
      userName: profile.userName,
      password: profile.password,
      email: profile.email,
      picture: profile.picture
    });
  }

  /**
   * Controller Method to Request send mail with reset password options
   */
  resetPassword() {
    this.startLoader();
    this.authProvider.resetPassword(this.profileModel.email).subscribe(
      data => {
        this.logoutLocal(this.profileModel.token);
        this.showAlert('Restablecer clave',
          'Hemos enviado un email a ' + this.profileModel.email + ' con las instrucciones para reestablecer tu clave.',
          'ACEPTAR');
        this.loading.dismiss();
      },
      err => {
        console.log(JSON.stringify(err));
        this.showAlert('Restablecer clave',
          'Se ha producido un error al reestablecer tu clave, por favor intente nuevmente',
          'OK');
        this.loading.dismiss();
      });
  }

  /**
   *
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
   // alert.present();
  }

  /**
   *
   */
  confirmResetPassword() {
    let confirm = this.alertCtrl.create({
     // title: '¿Restablecer clave?',
      message: 'Enviaremos un email a ' + this.profileModel.email + ' con las instrucciones para restablecer tu clave.',
      buttons: [
        {
          text: 'CANCELAR',
         // color: 'kastor',
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


}
