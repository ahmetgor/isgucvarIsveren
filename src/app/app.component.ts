import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OzgecmislerimPage } from '../pages/ozgecmislerim/ozgecmislerim';
import { TumOzgecmislerPage } from '../pages/tum-ozgecmisler/tum-ozgecmisler';
import { IlanlarimPage } from '../pages/ilanlarim/ilanlarim';
import { TumIlanlarPage } from '../pages/tum-ilanlar/tum-ilanlar';
import { IlanEklePage } from '../pages/ilan-ekle/ilan-ekle';
import { LoginPage } from '../pages/login/login';
import { UserSerProvider } from '../providers/user-ser';
import { Storage } from '@ionic/storage';
import { HesapPage } from '../pages/hesap/hesap';
import { FirmaHesapPage } from '../pages/firma-hesap/firma-hesap';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  alert: any;
  user: any;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public alertCtrl: AlertController, public authService: UserSerProvider,
              public storage: Storage,  public events: Events) {
    this.initializeApp();

    this.events.subscribe('login:event', (a) => {
      this.storage.get('user')
          .then((user) => { this.user = user;
            console.log(JSON.stringify('login fired'));
            // str.substring(0, str.indexOf(":"));
          });
});
    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'İlan Ekle', component: IlanEklePage, icon: "add-circle"  },
      { title: 'Özgeçmişlerim', component: OzgecmislerimPage, icon: "person"  },
      { title: 'İlanlarım', component: IlanlarimPage, icon: "clipboard" },
      { title: 'Tüm Özgeçmişler', component: TumOzgecmislerPage, icon: "people" },
      { title: 'Tüm İlanlar', component: TumIlanlarPage, icon: "filing" }
    ];

  }

  initializeApp() {
    this.storage.get('user')
        .then((user) => { this.user = user;
          console.log(JSON.stringify(user));
          // str.substring(0, str.indexOf(":"));
        });
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.registerBackButtonAction(() => {

  if(this.nav.canGoBack()){
    this.nav.pop();
  }else{
    if(this.alert){
      this.alert.dismiss();
      this.alert =null;
    }else{
      this.presentLogout('Uygulama kapansın mı?');
     }
  }
});
    });
  }

  presentLogout(message) {
   this.alert = this.alertCtrl.create({
    title: message,
    // message: 'Çıkmak istediğinizden emin misiniz?',
    buttons: [
      {
        text: 'Hayır',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Evet',
        handler: () => {
          console.log('Logged out');
          if (message=='Uygulama kapansın mı?') {
            this.platform.exitApp();
          }
          else {
          this.authService.logout();
          this.nav.setRoot(LoginPage);
        }
        }
      }
    ]
  });
  this.alert.present();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
  goHesap() {
    this.nav.push(HesapPage);
  }
  goFirmaHesap() {
    this.nav.push(FirmaHesapPage);
  }
}
