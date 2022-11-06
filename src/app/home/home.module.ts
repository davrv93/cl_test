import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LoginPage } from 'src/pages/login/login';
import { LoginModule } from 'src/pages/login/login.module';
import { PropertiesModule } from 'src/pages/properties/properties.module';
import { PropertyDetailModule } from 'src/pages/property-detail/property-detail.module';
import { ImageHeaderRoutingModule } from 'src/components/image-header-page/image-header-routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginModule,
    ImageHeaderRoutingModule,
    PropertiesModule,
    HomePageRoutingModule,
    PropertyDetailModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
