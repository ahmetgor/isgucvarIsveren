import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserSerProvider} from '../../providers/user-ser';
import { LoginPage } from '../login/login';
/**
 * Generated class for the AyarlarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ayarlar',
  templateUrl: 'ayarlar.html',
})
export class AyarlarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authService: UserSerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AyarlarPage');
    if (!this.authService.currentUser) {
    this.authService.checkAuthentication().then((res) => {
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
  }

}
