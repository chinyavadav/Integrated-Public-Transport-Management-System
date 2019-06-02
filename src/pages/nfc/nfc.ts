import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams, LoadingController,ToastController, AlertController } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';
import { Http } from '@angular/http';
import { FaresPage } from '../fares/fares';
import { GlobalProvider } from "../../providers/global/global";
/**
 * Generated class for the NfcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nfc',
  templateUrl: 'nfc.html',
})
export class NfcPage {

	nfcToken:any;
	caption:string="";
	listener:any;
	constructor(public toastCtrl:ToastController, public global:GlobalProvider,public http:Http,public alertCtrl:AlertController,public loadingCtrl:LoadingController,private nfc: NFC, public navCtrl: NavController, public navParams: NavParams) {

	}

	ionViewDidEnter() {
		this.getTrip();
	}

	getTrip(){
		this.http.get(this.global.serverAddress+"/api/gettrip.php?phoneno="+this.global.session.fldterminalid)
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

	scanNFC(){
		this.nfc.enabled().then(() => {
			this.addListenNFC();
		})
		.catch(err => {
			let alert = this.alertCtrl.create({
				subTitle: 'Error: '+err,
				buttons: [
					{ text: 'OK'},
					{ text: 'SETTINGS',
						handler: () => {this.nfc.showSettings();}
					}
				]
			});
			alert.present();
		});
	}

	addListenNFC() {
		//addTagDiscoveredListener(nfcEvent => this.sesReadNFC(nfcEvent.tag))
		this.caption="tap to pay";
	    this.listener=this.nfc.addTagDiscoveredListener().subscribe(data => {
	        if (data && data.tag && data.tag.id) {
	            let tagId = this.nfc.bytesToHexString(data.tag.id);
	            if (tagId) {
				    if(this.global.trip==null){
				  		this.navCtrl.push(FaresPage);
				  		this.listener.unsubscribe();
				  	}else{
	                	this.payNFC(tagId);
	                	this.listener.unsubscribe();
	                }
	            } else {
	            	this.listener.unsubscribe();
	               	let alert = this.alertCtrl.create({
						title: 'Home',
						subTitle: "Tag ID not detected!",
						buttons: ['OK']
					});
					alert.present();
	            }
	        }
	    });
	}

	sesReadNFC(data): void {
	   	let alert = this.alertCtrl.create({
			title: 'Home',
			subTitle: "NFC IS WORKING!",
			buttons: ['OK']
		});
		alert.present();
	}

  	payNFC(tagId:string){
  		let data={
  			tagid:tagId,
  			amount:this.global.trip.amount,
  			tripid:this.global.trip.tripid
  		};
  		this.http.post(this.global.serverAddress+"api/nfcpay.php",JSON.stringify(data))
		.subscribe(data => {
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
		this.caption="";
  	}
}
