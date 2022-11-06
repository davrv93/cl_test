import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyDetailPage } from './property-detail';
import { PropertyDetailRoutingModule } from './propertiy-detail-routing.module';
import { ImageHeaderModule } from 'src/components/image-header-page/image-header.module';
import { ImageHeaderRoutingModule } from 'src/components/image-header-page/image-header-routing';
import { MomentModule } from "ngx-moment";
import { CurrencyFormat } from '../../pipes/currency-format';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageHeaderModule,
    PropertyDetailRoutingModule,
    MomentModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [PropertyDetailPage,CurrencyFormat]
})
export class PropertyDetailModule {}
