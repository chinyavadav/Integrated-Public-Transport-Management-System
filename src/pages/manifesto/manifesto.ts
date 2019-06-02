import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
/**
 * Generated class for the ManifestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manifesto',
  templateUrl: 'manifesto.html',
})
export class ManifestoPage {

	fares:any;
	tripid:string;
	from:string;
	to:string;
	total:number=0;

	constructor(public toastCtrl:ToastController, public alertCtrl:AlertController, public http:Http,public global:GlobalProvider,public navCtrl: NavController, public navParams: NavParams) {
		this.tripid=this.navParams.get("tripid");
		if(this.tripid==null){
			this.navCtrl.pop();
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ManifestoPage');
		this.getFare();
	}

	getTotal(){
		this.total=0;
		for(var i=0;i<this.fares.length;i++){
			this.total=this.total+parseInt(this.fares[i].fldamount);
		}
	}

	getFare() {
		this.http.get(this.global.serverAddress+"api/manifesto.php?tripid="+this.tripid)
		.subscribe(data => {
			try{
				var response=JSON.parse(data["_body"]);
				this.fares=response.fares;
				this.from=response.trip.fldfrom;
				this.to=response.trip.fldto;
				this.getTotal();
			}catch{
				this.navCtrl.pop();
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

  	filterFares(ev: any) {
	    this.http.get(this.global.serverAddress+"api/manifesto.php?tripid="+this.tripid)
	      .subscribe(data => {
	        var response=JSON.parse(data["_body"]);
	        let val = ev.target.value;
	        if (val && val.trim() !== '') {
	          	this.fares = response.fares.filter((fare) => {
	            	return ((fare.fldphoneno.toLowerCase().indexOf(val.toLowerCase()) > -1));
	          	});
	        }else{
	        	this.fares=response.fares;
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
