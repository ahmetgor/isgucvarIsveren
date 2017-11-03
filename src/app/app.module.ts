import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { OzgecmislerimPage } from '../pages/ozgecmislerim/ozgecmislerim';
import { TumOzgecmislerPage } from '../pages/tum-ozgecmisler/tum-ozgecmisler';
import { IlanlarimPage } from '../pages/ilanlarim/ilanlarim';
import { TumIlanlarPage } from '../pages/tum-ilanlar/tum-ilanlar';
import { OzgecmisDetayPage} from '../pages/ozgecmis-detay/ozgecmis-detay';
import { IlanDetayPage } from '../pages/ilan-detay/ilan-detay';
import { IlanFiltrelePage } from '../pages/ilan-filtrele/ilan-filtrele';
import { OzgecmisFiltrelePage } from '../pages/ozgecmis-filtrele/ozgecmis-filtrele';
import { IlanEklePage } from '../pages/ilan-ekle/ilan-ekle';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPage } from '../pages/reset/reset';
import { SignupFirmaPage } from '../pages/signup-firma/signup-firma';
import { HesapPage } from '../pages/hesap/hesap';
import { FirmaHesapPage } from '../pages/firma-hesap/firma-hesap';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IlanSerProvider } from '../providers/ilan-ser';
import { OzgecmisSerProvider } from '../providers/ozgecmis-ser';
import { UserSerProvider } from '../providers/user-ser';
import { AktiviteSerProvider } from '../providers/aktivite-ser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { DatePipe } from '../pipes/date-pipe';
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import * as  Cloudinary from 'cloudinary-core';
import { Camera } from '@ionic-native/camera';
import { Deeplinks } from '@ionic-native/deeplinks';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { LinkedInSdkModule } from 'angular-linkedin-sdk';


@NgModule({
  declarations: [
    MyApp,
    // OzgecmislerimPage,
    // OzgecmisDetayPage,
    // TumOzgecmislerPage,
    // IlanlarimPage,
    // IlanDetayPage,
    // TumIlanlarPage,
    // DatePipe,
    IlanFiltrelePage,
    OzgecmisFiltrelePage,
    // IlanEklePage,
    LoginPage,
    SignupPage,
    SignupFirmaPage,
    ResetPage
    // HesapPage,
    // FirmaHesapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    CloudinaryModule.forRoot(Cloudinary,
    {cloud_name: 'isgucvar', upload_preset: 'cod9ui0a'}),
    LinkedInSdkModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // OzgecmislerimPage,
    // OzgecmisDetayPage,
    // TumOzgecmislerPage,
    // IlanlarimPage,
    // IlanDetayPage,
    // TumIlanlarPage,
    IlanFiltrelePage,
    OzgecmisFiltrelePage,
    // IlanEklePage,
    LoginPage,
    SignupPage,
    SignupFirmaPage,
    ResetPage
    // HesapPage,
    // FirmaHesapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserSerProvider,
    AktiviteSerProvider,
    IlanSerProvider,
    OzgecmisSerProvider,
    Camera,
    Deeplinks,
    SocialSharing,
    Facebook,
    { provide: 'apiKey', useValue: '86p3aqpfdryb6f' },
    { provide: 'authorize', useValue: 'true' }, // OPTIONAL by default: false
    { provide: 'isServer', useValue: 'true' }  // OPTIONAL by default: false
    ]
})
export class AppModule {}
