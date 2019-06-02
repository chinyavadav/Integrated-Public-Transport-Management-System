import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import { QrcodePage } from '../qrcode/qrcode';
import { NfcPage } from '../nfc/nfc';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	nfcPage=NfcPage;
	qrcodePage=QrcodePage;
	constructor(public navCtrl: NavController, public navParams: NavParams){

	}
}
