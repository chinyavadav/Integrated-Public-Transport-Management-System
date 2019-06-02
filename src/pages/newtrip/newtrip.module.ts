import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewtripPage } from './newtrip';

@NgModule({
  declarations: [
    NewtripPage,
  ],
  imports: [
    IonicPageModule.forChild(NewtripPage),
  ],
})
export class NewtripPageModule {}
