import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerProfilePage } from './passenger-profile';

@NgModule({
  declarations: [
    PassengerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerProfilePage),
  ],
})
export class PassengerProfilePageModule {}
