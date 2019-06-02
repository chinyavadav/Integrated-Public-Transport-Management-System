import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { NewtripPage } from '../newtrip/newtrip';
import { ManifestoPage } from '../manifesto/manifesto';

/**
 * Generated class for the TripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
	trips:any;
  	tripFilter = 'today';
	constructor(public toastCtrl:ToastController, public http:Http,public global:GlobalProvider,public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TripsPage');
		this.getTrip(this.tripFilter);
	}

	newTrip(){
		this.navCtrl.push(NewtripPage);
	}

	more(item:any,tripid:string){
		this.navCtrl.push(ManifestoPage,{"tripid":tripid});
		item.close();
	}

	getTrip(criteria: any) {
		if(criteria=="0" || criteria=="1"){
			var list=["today","all"];
			criteria=list[criteria];
		}
		this.tripFilter=criteria;
		this.http.get(this.global.serverAddress+"api/trips.php?phoneno="+this.global.session.fldterminalid+"&type="+this.tripFilter)
		.subscribe(data => {
			this.trips=JSON.parse(data["_body"]);
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
  	}
}
