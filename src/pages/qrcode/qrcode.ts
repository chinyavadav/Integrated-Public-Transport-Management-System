import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Http } from '@angular/http';
import { FaresPage } from '../fares/fares';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

	qrToken:any;
	constructor(public toastCtrl:ToastController, public global:GlobalProvider,public http:Http,public alertCtrl:AlertController,public loadingCtrl:LoadingController, public navCtrl: NavController, public navParams: NavParams, public qrScanner: QRScanner) {

	}

	ionViewDidEnter() {
		this.getTrip();
	}

	getTrip(){
		this.http.get(this.global.serverAddress+"api/gettrip.php?phoneno="+this.global.session.fldterminalid)
		.subscribe(data => {
			let response=JSON.parse(data["_body"]);
			if(response.response=="success"){
				let temp={
					amount:response.fldamount,
					from:response.fldfrom,
					to:response.fldto,
					tripid:response.fldtripid
				};		
				this.global.trip=temp;
			}else{
				this.global.trip=null;
			}  
		}, error => {
			this.global.trip=null;
            let toast = this.toastCtrl.create({
              message: 'Please connect to Internet!',
              duration: 3000,
              position: 'bottom',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
		});
	}

	scanQR(){
		this.qrScanner.prepare()
		.then((status: QRScannerStatus) => {
			if (status.authorized) {
				// camera permission was granted
				this.qrScanner.show();
				// start scanning
				let scanSub = this.qrScanner.scan().subscribe((text: string) => {
					try{
						this.qrToken=JSON.parse(text);
						if(this.qrToken.phoneno!="" && this.qrToken.token!=""){
							if(this.global.trip==null){
						  		this.navCtrl.push(FaresPage);
						  	}else{
						  		this.payQR();
						  	}
						}else{
							let alert = this.alertCtrl.create({
								title: 'Payment',
								subTitle: 'Unsupported QRcode scanned!',
								buttons: ['OK']
							});
							alert.present();
						}	       		
					}catch(err){
						let alert = this.alertCtrl.create({
							title: 'Payment',
							subTitle: 'Unsupported QRcode scanned!',
							buttons: ['OK']
						});
						alert.present();
					}
					this.qrScanner.hide(); // hide camera preview
					scanSub.unsubscribe(); // stop scanning
				});

			} else if (status.denied) {
				let alert = this.alertCtrl.create({
					title: 'Payment',
					subTitle: 'Camera access denied!',
					buttons: ['OK']
				});
				alert.present();
				// camera permission was permanently denied
				// you must use QRScanner.openSettings() method to guide the user to the settings page
				// then they can grant the permission from there
			} else {
				let alert = this.alertCtrl.create({
					title: 'Payment',
					subTitle: 'Camera access temporarily denied!',
					buttons: ['OK']
				});
				alert.present();
				// permission was denied, but not permanently. You can ask for permission again at a later time.
			}
		})
		.catch((e: any) => {
			let alert = this.alertCtrl.create({
				title: 'Payment',
				subTitle: 'Error: '+e,
				buttons: ['OK']
			});
			alert.present();
		});
	}

  	payQR(){
		let loader = this.loadingCtrl.create({
		content: "Processing...",
		spinner:"bubbles"
		});
		loader.present();
  		let data={
  			phoneno:this.qrToken.phoneno,
  			token:this.qrToken.token,
  			amount:this.global.trip.amount,
  			tripid:this.global.trip.tripid

  		};
  		this.http.post(this.global.serverAddress+"api/qrpay.php",JSON.stringify(data))
		.subscribe(data => {
			console.log(data["_body"]);
			let response=JSON.parse(data["_body"]);
			if(response.response=="success"){
				let alert = this.alertCtrl.create({
					title: 'Payment',
					subTitle: 'Transaction successful!',
					buttons: ['OK']
				});
				alert.present();
			}else{
				let alert = this.alertCtrl.create({
					title: 'Payment',
					subTitle: response.response,
					buttons: ['OK']
				});
				alert.present();
			} 
		}, error => {
            let toast = this.toastCtrl.create({
              message: 'Please connect to Internet!',
              duration: 3000,
              position: 'bottom',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
		});	  	
	  	loader.dismiss();
  	}
}
