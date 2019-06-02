import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripsPage } from './trips';
import { PipesModule } from "../../pipes/pipes.module";
import { RelativeTimePipe } from "../../pipes/relative-time/relative-time";

@NgModule({
  declarations: [
    TripsPage,
    RelativeTimePipe
  ],
  imports: [
    IonicPageModule.forChild(TripsPage),
    PipesModule
  ],
})
export class TripsPageModule {}
