import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the NewtripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newtrip',
  templateUrl: 'newtrip.html',
})
export class NewtripPage {
	private newTripForm:FormGroup;
  amount:number;
	constructor(public toastCtrl:ToastController, public storage:Storage, private global:GlobalProvider,private http:Http,private alertCtrl:AlertController,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
		var validators={
	      "to_from":[Validators.required,Validators.maxLength(20),Validators.minLength(2)],
	      "amount":[Validators.required,Validators.min(0),Validators.max(9999999)]
	    };
		this.newTripForm=this.formBuilder.group({
			from: ['',validators.to_from],
			to: ['',validators.to_from],
			amount: ['',validators.amount],
			terminalid: ['',Validators.required]
		});
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewtripPage');
  }

  newTrip(){
  	if(this.newTripForm.valid){
  		this.http.post(this.global.serverAddress+"/api/starttrip.php", JSON.stringify(this.newTripForm.value))
        .subscribe(data => {
          console.log(data["_body"]);
          let response = JSON.parse(data["_body"]);
          if(response.response=="success"){
             let alert = this.alertCtrl.create({
                title: 'New Trip',
                subTitle: 'Trip successfully started!',
                buttons: ['OK']
            });
            alert.present();
            this.global.trip=null;
            this.navCtrl.pop();
          }else{
            let alert = this.alertCtrl.create({
                title: 'New Trip',
                subTitle: 'Trip could not be started!',
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
        }
      );
  	}else{
        let alert = this.alertCtrl.create({
            title: 'New Trip',
            subTitle: 'Please fill in valid form data!',
            buttons: ['RETRY']
        });
        alert.present();
    }
  }

}
