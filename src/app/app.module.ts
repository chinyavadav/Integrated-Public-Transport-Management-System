import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NFC, Ndef } from '@ionic-native/nfc';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Camera } from '@ionic-native/camera';
import { File } from  '@ionic-native/file';
import { FileTransfer } from  '@ionic-native/file-transfer';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { GlobalProvider } from '../providers/global/global';


import { FaresPage } from '../pages/fares/fares';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ManifestoPage } from '../pages/manifesto/manifesto';
import { MytripsPage } from '../pages/mytrips/mytrips';
import { NewtripPage } from '../pages/newtrip/newtrip';
import { NfcPage } from '../pages/nfc/nfc';
import { PassengerLoginPage } from '../pages/passenger-login/passenger-login';
import { PassengerProfilePage } from '../pages/passenger-profile/passenger-profile';
import { QrcodePage } from '../pages/qrcode/qrcode';
import { QrpagePage } from '../pages/qrpage/qrpage';
import { RelativeTimePipe } from '../pipes/relative-time/relative-time';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { TopupPage } from '../pages/topup/topup';
import { TripsPage } from '../pages/trips/trips';

@NgModule({
  declarations: [
    MyApp,
    FaresPage,
    HomePage,
    LoginPage,
    ManifestoPage,
    MytripsPage,
    NewtripPage,
    NfcPage,
    PassengerLoginPage,
    PassengerProfilePage,
    QrcodePage,
    QrpagePage,
    RelativeTimePipe,   
    SettingsPage,
    SignupPage,
    TopupPage,
    TripsPage        
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FaresPage,
    HomePage,
    LoginPage,
    ManifestoPage,
    MytripsPage,
    NewtripPage,
    NfcPage,
    PassengerLoginPage,
    PassengerProfilePage,
    QrcodePage,
    QrpagePage,
    SettingsPage,
    SignupPage,
    TopupPage,
    TripsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QRScanner,
    NFC,
    Ndef,
    GlobalProvider,
    Camera,
    FileTransfer,
    File
  ]
})
export class AppModule {}
