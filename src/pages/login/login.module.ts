import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from 'src/pages/login/login';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [LoginPage]
})
export class LoginModule {}
