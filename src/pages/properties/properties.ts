import { Component } from '@angular/core';
import { NavController, NavParams,   LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { PropertyProvider } from '../../providers/property.provider';
import { AuthProvider } from '../../providers/auth.provider';
import { AppPage } from '../../app/app.page';
import * as _ from 'lodash';
import { StorageService } from 'src/services/storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'page-properties',
  templateUrl: 'properties.html',
  styleUrls:['properties.scss'],

  providers: [Storage, PropertyProvider, NavParams]
})
export class PropertiesPage extends AppPage {

  private propertyProvider: PropertyProvider;
  private authProvider: AuthProvider;
  private storage: StorageService;
  private random: number;
  private rolesMap: any;

  properties: any;
  profile: any;

  page: {
    title: string,
    component: any
  };

  pageDetail: {
    title: string,
    component: any
  };


  /**
   * constructor
   * @param navCtrl
   * @param navParams
   * @param nav
   * @param property
   */
  constructor(public navCtrl: NavController,
    loadingCtrl: LoadingController,
    alertCtrl: AlertController,
    public navParams: NavParams,
    propertyProvider: PropertyProvider,
    authProvider: AuthProvider,
    private router: Router,
    storage: StorageService) {

    super(alertCtrl, loadingCtrl);
    this.page = { title: 'Inmuebles', component: PropertiesPage };
    this.pageDetail = { title: 'Inmueble', component: PropertyDetailPage };

    this.storage = storage;
    this.propertyProvider = propertyProvider;
    this.authProvider = authProvider;

    this.startLoader();
  }

  ionViewDidLoad() {
    console.log('test');
    this.buildRolesMap();
    this.randomImage();
    this.loadPropertiesByEmail();
  }

  
  ionViewDidEnter() {
    console.log('test');
    this.buildRolesMap();
    this.randomImage();
    this.loadPropertiesByEmail();
  }

  isEmptyObject(obj) {
    return _.isEmpty(obj);
  }

  /**
   *
   * @param property
   */
  viewPropertyDetails(property: any) {
    console.log('calling PropertyDetail');
    this.storage.set('property',property);
    this.router.navigate(['/property-detail',{}])

    /*this.nav.push(PropertyDetailPage, { property: property }, {
      animate: true, direction: 'front'
    });*/
  }

  /**
   *
   */
  buildRolesMap() {
    console.log('test');
      this.storage.get('profile').then((profile) => {
        console.log(profile);
        this.profile = profile;
        this.authProvider.findAllRoles(profile.token).subscribe(
          roles => {
            this.rolesMap = _.keyBy(roles, 'id');
          },
          err => {
            console.log(JSON.stringify(err));
          });
      });
  }

  /**
   *
   */
  loadPropertiesByEmail() {
    this.loadingCtrl.create();

      this.storage.get('profile').then((profile) => {
        this.profile = profile;
        console.log('profile',profile)
        if(!profile.email){
          
        }
        let propertyProvider = this.propertyProvider;
        this.propertyProvider.propertiesAndRolByEmail2(profile.email? profile.email:profile.userName, profile.token).subscribe(
           properties => { 
            this.properties = properties;
            
            _.forEach(this.properties, function (property) {
              let prop = property;
              if (_.startsWith(prop.inmueble.nombreInmueble, 'D')) {
                property.image = 'assets/images/building_icon_1.png';
              } else if (_.startsWith(prop.inmueble.nombreInmueble, 'C')) {
                property.image = 'assets/images/building_icon_2.png';
              } else {
                property.image = 'assets/images/home_marker-512.png';
              }
              propertyProvider.comunidadById(prop.idComunidad, prop.idAdministrador).subscribe(
                comunidad => {
                  property.comunidad = comunidad;
                },
                err => {
                  console.log(JSON.stringify(err));
                });

              propertyProvider.usuarioByInmuebleEach(prop.idComunidad, prop.idAdministrador, prop.inmueble.idInmueble).subscribe(
                usuario => {
                  if (!_.isEmpty(usuario)) {
                    property.usuario = usuario[0];
                  } else {
                    property.usuario = null;
                  }

                },
                err => {
                  console.log(JSON.stringify(err));
                });

            });
            //this.loadingCtrl.dismiss();
            });

       

          },
          err => {
            console.log(JSON.stringify(err));
            //this.loadingCtrl.dismiss();
          });
  }


  /**
   *
   * @param page
   */
  openPage(page) {
  // this.nav.push(page.component);
  }

  /**
   *
   */
  randomImage() {
    this.random = Math.floor(Math.random() * 4);
  }


}
