import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';

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
import { IlanDetayPage } from '../pages/ilan-detay/ilan-detay';
import { OzgecmisDetayPage } from '../pages/ozgecmis-detay/ozgecmis-detay';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  alert: any;
  user: any = {};
  pages: Array<{title: string, component: any, icon: string}>;
  username: String = "";

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public alertCtrl: AlertController, public authService: UserSerProvider,
              public storage: Storage,  public events: Events, public deeplinks: Deeplinks) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'İlan Ekle', component: 'IlanEklePage', icon: "add-circle"  },
      { title: 'İlanlarım', component: 'IlanlarimPage', icon: "clipboard" },
      { title: 'Firmanın İlanları', component: 'TumIlanlarPage', icon: "filing" },
      { title: 'Özgeçmişlerim', component: 'OzgecmislerimPage', icon: "person"  },
      { title: 'Tüm Özgeçmişler', component: 'TumOzgecmislerPage', icon: "people" }
    ];

  }

  initializeApp() {
    this.events.subscribe('login:event', () => {
      // this.storage.get('user')
      //     .then((user) => { this.user = user;
      //       this.username = user.email.substring(0, user.email.indexOf('@'));
      //       console.log(JSON.stringify(this.user)+"initial");
      //       // str.substring(0, str.indexOf(":"));
      //     });
      this.user = this.authService.currentUser;
      this.username = this.user.email.substring(0, this.user.email.indexOf('@'));
});
    // this.storage.get('user')
    //     .then((user) => { this.user = user;
    //       this.username = user.email.substring(0, user.email.indexOf('@'));
    //       console.log(JSON.stringify(user));
    //       // str.substring(0, str.indexOf(":"));
    //     });
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

// this.deeplinks.routeWithNavController(this.nav, {
//   '/ilanlar/:ilanId': IlanDetayPage,
//   '/ozgecmisler/:ozgecmisId': OzgecmisDetayPage
//   // '/products/:productId': ProductPage
// }).subscribe((match) => {
//   console.log('Successfully routed', match);
// }, (nomatch) => {
//   console.warn('Unmatched Route', nomatch);
// });
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
