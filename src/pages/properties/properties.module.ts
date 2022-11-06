import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesPage } from './properties';
import { ImageHeaderModule } from 'src/components/image-header-page/image-header.module';
import { ImageHeaderRoutingModule } from 'src/components/image-header-page/image-header-routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertiesRoutingModule,
    ImageHeaderModule,
    ImageHeaderRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [PropertiesPage, ]
})
export class PropertiesModule {}
