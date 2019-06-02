import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManifestoPage } from './manifesto';

@NgModule({
  declarations: [
    ManifestoPage,
  ],
  imports: [
    IonicPageModule.forChild(ManifestoPage),
  ],
})
export class ManifestoPageModule {}
