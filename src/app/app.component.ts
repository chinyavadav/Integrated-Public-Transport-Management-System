import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { FaresPage } from '../pages/fares/fares';
import { GlobalProvider } from "../providers/global/global";
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { QrpagePage } from '../pages/qrpage/qrpage';
import { SettingsPage } from '../pages/settings/settings';
import { TripsPage } from '../pages/trips/trips';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl;  
  rootPage:any;

  constructor(public global: GlobalProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController, public storage: Storage) {
    platform.ready().then(() => {          
      this.storage.ready().then(()=> {
        this.storage.get('serverAddress').then((val) =>{
          this.setServerAddress(val);
        });
        this.storage.get('session').then((val) =>{
          this.setAccount(val);
        });
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  setAccount(val){
    this.global.session=val;
    if(this.global.session==null){
      this.rootPage = LoginPage;
      this.global.dispSession.name="No Sesssion";
      this.global.dispSession.terminalid="xxxxxxxxx"; 
    }else{
      try{
        if(this.global.session.hasOwnProperty("fldterminalid")){
          this.rootPage = HomePage;
          this.global.dispSession.name=this.global.session.fldname;
          this.global.dispSession.terminalid=this.global.session.fldterminalid;
        }else{
          this.rootPage = QrpagePage;
        }
      }catch{
        this.rootPage = QrpagePage;
      } 
    }
  }

  setServerAddress(val){
    if(val==null){
      this.global.serverAddress="http://iptfcs.000webhostapp.com/";
      this.storage.set("serverAddress",this.global.serverAddress);
    }else{
      this.global.serverAddress=val;
    }
  }

  openPage(index){
    var pages=[FaresPage,TripsPage,SettingsPage];
    this.navCtrl.push(pages[index]);
    console.log(pages[index]);
  }
  
  logout(){
    this.storage.remove("session"); 
    this.global.session=null;
    this.global.trip=null;
    this.global.dispSession.name="No Session";
    this.global.dispSession.terminalid="xxxxxxxxx";
    this.navCtrl.setRoot(LoginPage);
  }

}

