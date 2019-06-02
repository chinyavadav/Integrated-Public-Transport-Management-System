import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MytripsPage } from './mytrips';

@NgModule({
  declarations: [
    MytripsPage,
  ],
  imports: [
    IonicPageModule.forChild(MytripsPage),
  ],
})
export class MytripsPageModule {}
