import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TopupPage } from '../topup/topup';

/**
 * Generated class for the PassengerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passenger-profile',
  templateUrl: 'passenger-profile.html',
})
export class PassengerProfilePage {
	profile:any={
		fldphoneno:'',
		fldfirstname:'',
		fldlastname:'',
		fldamount:''
	};
	private passwordForm:FormGroup;
	constructor(public toastCtrl:ToastController, private global:GlobalProvider,private http:Http,private alertCtrl:AlertController,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
		var validators={
	      "password":[Validators.required,Validators.maxLength(20),Validators.minLength(8)]
	    };

		this.passwordForm=this.formBuilder.group({
			password: ['',validators.password],
			verifypassword: ['',validators.password],
			phoneno: ['',Validators.required]
		});
	}
	topup(){
		this.navCtrl.push(TopupPage);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PassengerProfilePage');
		this.getProfile();
	}

	getProfile(){
		this.http.get(this.global.serverAddress+"api/getpassenger.php?phoneno="+this.global.session.fldphoneno)
	    .subscribe(data => {
	     	console.log(data["_body"]);
	     	let response=JSON.parse(data["_body"]);
	      	if(response.response=="success"){
	      		this.profile=response;
	      	}else{
	      		this.navCtrl.pop();
	      	}  
	    	}, error => {
				this.navCtrl.pop();
	    	}
	  	);
	}

	update(){
  		if(this.passwordForm.valid){
	  		this.http.post(this.global.serverAddress+"/api/passengerpassword.php", JSON.stringify(this.passwordForm.value))
	        .subscribe(data => {
	          console.log(data["_body"]);
	          let response = JSON.parse(data["_body"]);
	          if(response.response=="success"){
	             let alert = this.alertCtrl.create({
	                title: 'Password',
	                subTitle: 'Password successfully changed!',
	                buttons: ['OK']
	            });
	            alert.present();
	          }else{
	            let alert = this.alertCtrl.create({
	                title: 'Password',
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
	  	}else{
	        let alert = this.alertCtrl.create({
	            title: 'Password',
	            subTitle: 'Please use valid password!',
	            buttons: ['RETRY']
	        });
	        alert.present();
	    }
  }

}
