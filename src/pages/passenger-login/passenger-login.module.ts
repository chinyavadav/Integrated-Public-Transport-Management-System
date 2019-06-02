import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerLoginPage } from './passenger-login';

@NgModule({
  declarations: [
    PassengerLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerLoginPage),
  ],
})
export class PassengerLoginPageModule {}
