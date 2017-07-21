import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OzgecmislerimPage } from '../pages/ozgecmislerim/ozgecmislerim';
import { TumOzgecmislerPage } from '../pages/tum-ozgecmisler/tum-ozgecmisler';
import { IlanlarimPage } from '../pages/ilanlarim/ilanlarim';
import { TumIlanlarPage } from '../pages/tum-ilanlar/tum-ilanlar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IlanlarimPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'Özgeçmişlerim', component: OzgecmislerimPage, icon: "person"  },
      { title: 'İlanlarım', component: IlanlarimPage, icon: "clipboard" },
      { title: 'Tüm Özgeçmişler', component: TumOzgecmislerPage, icon: "people" },
      { title: 'Tüm İlanlar', component: TumIlanlarPage, icon: "filing" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
