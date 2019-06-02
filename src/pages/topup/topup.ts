import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
})
export class TopupPage {
  private topupForm: FormGroup;
  constructor(public loadingCtrl:LoadingController, private formBuilder: FormBuilder,public global:GlobalProvider,public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http, public toastCtrl: ToastController) {
    var validators={
	      "phoneno":[Validators.required,Validators.maxLength(10),Validators.minLength(10)],
	      "amount":[Validators.required,Validators.min(0),Validators.max(9999999)]
	};
    this.topupForm=this.formBuilder.group({
      phoneno: ['',Validators.required],
      phoneno_source: ['',validators.phoneno],
      amount: ['',validators.amount]
    });
  }

  topupFxn() {
    if(this.topupForm.valid){
      let loader = this.loadingCtrl.create({
        content: "Connecting...",
        spinner:"bubbles"
      });
      loader.present();
      this.http.post(this.global.serverAddress+"api/topup.php", JSON.stringify(this.topupForm.value))
        .subscribe(data => {
          console.log(data["_body"]);
          let response=JSON.parse(data["_body"]);
          if(response.response=="success"){
            let alert = this.alertCtrl.create({
              title: 'Topup',
              subTitle: "Topup was successful!",
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.pop();
          }else{
            let alert = this.alertCtrl.create({
              title: 'Topup',
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
        }
      );
      loader.dismiss();
    }else{
        let alert = this.alertCtrl.create({
            title: 'Topup',
            subTitle: 'Please fill in valid form data!',
            buttons: ['RETRY']
        });
        alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopupPage');
  }

}
