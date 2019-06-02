import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { TripsPage } from '../trips/trips';
import { NewtripPage } from '../newtrip/newtrip';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the faresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fares',
  templateUrl: 'fares.html',
})
export class FaresPage {
	fares:any;
	tripid:string;
	total:number=0;
	constructor(public toastCtrl:ToastController, public storage:Storage, public alertCtrl:AlertController, public http:Http,public global:GlobalProvider,public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FaresPage');
		this.getFare();
	}

	getTotal(){
		this.total=0;
		for(var i=0;i<this.fares.length;i++){
			this.total=this.total+parseInt(this.fares[i].fldamount);
		}
	}

	getFare() {
		this.http.get(this.global.serverAddress+"api/fares.php?phoneno="+this.global.session.fldterminalid)
		.subscribe(data => {
			try{
				let response=JSON.parse(data["_body"]);
				this.fares=response.fares;
				this.tripid=response.tripid;
				this.getTotal();
			}catch{
				let alert = this.alertCtrl.create({
	              title: 'Fares',
	              subTitle: 'Do you want to start new Trip?',
	              buttons: [
	              	{ text:'YES', handler: ()=>{
	              			this.navCtrl.pop();
	              			this.navCtrl.push(NewtripPage);
	              		}
	              	},
	              	{ text: 'NO', handler: ()=>{ this.navCtrl.pop();}}
	              ]
	            });
	            alert.present();
			}

		}, error => {
			let alert = this.alertCtrl.create({
              title: 'Fares',
              subTitle: 'Error connecting to Intenet!',
              buttons: ['OK']
            });
            alert.present();
		});
  	}

  	cancelTrip(){
  		this.http.get(this.global.serverAddress+"api/canceltrip.php?tripid="+this.tripid)
		.subscribe(data => {
			let response=JSON.parse(data["_body"]);
			if(response.response=="success"){
				let alert = this.alertCtrl.create({
	              title: 'Fares',
	              subTitle: 'Trip has been successfully closed!',
	              buttons: ['OK']
	            });
	            this.global.trip=null;
            	alert.present();
				this.navCtrl.popTo(TripsPage);
			}
		}, error => {
			let alert = this.alertCtrl.create({
              title: 'Fares',
              subTitle: 'Error connecting to Intenet!',
              buttons: ['OK']
            });
            alert.present();
		});
  	}

  	refund(item:any,fare:any){
  		console.log(fare);
  		this.http.post(this.global.serverAddress+"api/refund.php",JSON.stringify(fare))
		.subscribe(data => {
			console.log(data["_body"]);
			let response=JSON.parse(data["_body"]);
			
			if(response.response=="success"){
				let alert = this.alertCtrl.create({
	              title: 'Fares',
	              subTitle: 'Passenger has been successfully refunded!',
	              buttons: ['OK']
	            });
            	alert.present();
            	this.getFare();
			}else{
				let alert = this.alertCtrl.create({
	              title: 'Fares',
	              subTitle: 'Passenger cannot be refunded!',
	              buttons: ['OK']
	            });
            	alert.present();
			}
		}, error => {
			let alert = this.alertCtrl.create({
              title: 'Fares',
              subTitle: 'Error connecting to Intenet!',
              buttons: ['OK']
            });
            alert.present();
		});
		item.close();
  	}

  	filterFares(ev: any) {
	    this.http.get(this.global.serverAddress+"api/fares.php?phoneno="+this.global.session.fldterminalid)
	      .subscribe(data => {
	        let response=JSON.parse(data["_body"]);
	        let val = ev.target.value;
	        if (val && val.trim() !== '') {
	        	this.tripid=response.tripid;
	          	this.fares = response.fares.filter((fare) => {
	            	return ((fare.fldphoneno.toLowerCase().indexOf(val.toLowerCase()) > -1));
	          	});	          	
	        }else{
	        	this.fares=response.fares;
	        	this.tripid=response.tripid;
	        }
	        this.getTotal();
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
	      }
	    );
	}
}
