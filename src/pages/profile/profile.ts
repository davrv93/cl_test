import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PropertiesPage } from '../properties/properties';
import { ApplicationsPage } from '../applications/applications';
import { AppPage } from '../../app/app.page';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { ProfileModel } from '../../models/profile.model';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [Storage]
})

/**
 * @author rodrigo.reyes@kastor.cl
 */
export class ProfilePage extends AppPage {
  profileModel: ProfileModel = new ProfileModel();
  profileGoogle: string = 'google';
  profile: any;
  private storage: Storage;

  page: {
    title: string,
    component: any
  };

  pages: Array<{ title: string, component: any }>;

  /**
   *
   * @param navCtrl
   * @param navParams
   * @param nav
   * @param loadingCtrl
   * @param storage
   */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
               alertCtrl: AlertController, loadingCtrl: LoadingController,
              storage: Storage) {

    super(alertCtrl, loadingCtrl);
    this.storage = storage;
    this.page = { title: 'Mis Datos', component: ProfilePage };
    this.pages = [
      { title: 'Mis Datos', component: ProfilePage },
      { title: 'Mis Inmuebles', component: PropertiesPage },
      { title: 'Mis Solicitudes', component: ApplicationsPage },
      { title: 'Editar mis Datos', component: EditProfilePage }
    ];
  }

  /**
   * Set the profile model for view
   */
  public setProfileModel(profile: any) {
    this.profileModel.set({
      userId: profile.userId,
      token: null,
      emailVerified: true,
      provider: profile.provider,
      name: profile.name,
      lastName: profile.lastName,
      motherLastName: profile.motherLastName,
      userName: profile.userName,
      password: profile.password,
      email: profile.email,
      picture: profile.picture,
      roles: profile.roles
    });
  }

  /**
   * Open a view
   */
  openPage(page) {
    /*this.nav.setRoot(page.component, {}, {
      animate: true, direction: 'front'
    });*/
  }

  /**
   * Open edit profile view
   */
  openEditProfile() {
    /*this.nav.push(EditProfilePage, {}, {
      animate: true, direction: 'front'
    });*/
  }

  /**
   * Load data
   */
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      message: 'Cargando...'
    });
    //loading.present();
      this.storage.get('profile').then((profile) => {
        this.setProfileModel(profile);
        console.log(this.profileModel);
       // loading.dismiss();
      });
  }

}
