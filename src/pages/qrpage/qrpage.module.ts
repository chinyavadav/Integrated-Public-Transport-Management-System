import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrpagePage } from './qrpage';

@NgModule({
  declarations: [
    QrpagePage,
  ],
  imports: [
    IonicPageModule.forChild(QrpagePage),
  ],
})
export class QrpagePageModule {}
