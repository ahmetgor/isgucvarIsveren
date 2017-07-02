import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OzgecmislerimPage } from '../pages/ozgecmislerim/ozgecmislerim';
import { TumOzgecmislerPage } from '../pages/tum-ozgecmisler/tum-ozgecmisler';
import { IlanlarimPage } from '../pages/ilanlarim/ilanlarim';
import { TumIlanlarPage } from '../pages/tum-ilanlar/tum-ilanlar';
import { OzgecmisDetayPage} from '../pages/ozgecmis-detay/ozgecmis-detay';
import { IlanDetayPage } from '../pages/ilan-detay/ilan-detay';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IlanSerProvider } from '../providers/ilan-ser';
import { OzgecmisSerProvider } from '../providers/ozgecmis-ser';
import { UserSerProvider } from '../providers/user-ser';
import { AktiviteSerProvider } from '../providers/aktivite-ser';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    OzgecmislerimPage,
    OzgecmisDetayPage,
    TumOzgecmislerPage,
    IlanlarimPage,
    IlanDetayPage,
    TumIlanlarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    OzgecmislerimPage,
    OzgecmisDetayPage,
    TumOzgecmislerPage,
    IlanlarimPage,
    IlanDetayPage,
    TumIlanlarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IlanSerProvider,
    OzgecmisSerProvider,
    UserSerProvider,
    AktiviteSerProvider
  ]
})
export class AppModule {}