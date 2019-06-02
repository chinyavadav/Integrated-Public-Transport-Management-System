import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { MytripsPage } from "../mytrips/mytrips";
import { PassengerProfilePage } from "../passenger-profile/passenger-profile";
import { LoginPage } from "../login/login";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the QrpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrpage',
  templateUrl: 'qrpage.html',
})
export class QrpagePage {
	token:string;
	url:string="assets/imgs/qr.png";
	qrURL="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
	constructor(public storage:Storage, public toastCtrl: ToastController, public global:GlobalProvider, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad QrpagePage');
		this.refresh();
		setInterval(() => {
			if(this.global.session!=null && this.global.session.hasOwnProperty("fldphoneno")){
				this.refresh();
			}		  
		}, 60000);
	}

	trips(){
		this.navCtrl.push(MytripsPage);
	}

	profile(){
		this.navCtrl.push(PassengerProfilePage);
	}

	logout(){
	    this.storage.remove("session"); 
	    this.global.session=null;
	    this.navCtrl.setRoot(LoginPage);
  	}

	refresh(){
		this.http.get(this.global.serverAddress+"api/generate.php?phoneno="+this.global.session.fldphoneno)
		.subscribe(data => {
			let response=JSON.parse(data["_body"]);
			if(response.response!="error"){
				this.token=response;
				this.url=this.qrURL+JSON.stringify(this.token);
			}else{
				this.url="assets/imgs/qr.png";			
			}  
		}, error => {
			this.url="assets/imgs/qr.png";
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

}
