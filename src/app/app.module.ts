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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IlanSerProvider } from '../providers/ilan-ser';
import { OzgecmisSerProvider } from '../providers/ozgecmis-ser';
import { UserSerProvider } from '../providers/user-ser';
import { AktiviteSerProvider } from '../providers/aktivite-ser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { DatePipe } from '../pipes/date-pipe';


@NgModule({
  declarations: [
    MyApp,
    OzgecmislerimPage,
    OzgecmisDetayPage,
    TumOzgecmislerPage,
    IlanlarimPage,
    IlanDetayPage,
    TumIlanlarPage,
    DatePipe,
    IlanFiltrelePage,
    OzgecmisFiltrelePage
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
    OzgecmislerimPage,
    OzgecmisDetayPage,
    TumOzgecmislerPage,
    IlanlarimPage,
    IlanDetayPage,
    TumIlanlarPage,
    IlanFiltrelePage,
    OzgecmisFiltrelePage
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
