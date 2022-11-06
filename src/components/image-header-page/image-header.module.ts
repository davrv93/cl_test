import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from 'src/pages/login/login';
  import { ImageHeaderPage } from 'src/components/image-header-page/image-header-page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ImageHeaderPage]
})
export class ImageHeaderModule {}
