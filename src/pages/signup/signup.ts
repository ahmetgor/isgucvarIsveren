import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserSerProvider } from '../../providers/user-ser';
import { LoginPage } from '../login/login';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email: string;
  password: string;
  password1: string;
  firma: string;
  firmaPass: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: UserSerProvider, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  register(){
    // this.showLoader();
    let userDetails = {
        email: this.email,
        password: this.password,
        firma: this.firma,
        firmaPass: this.firmaPass
    };

    this.authService.createAccount(userDetails).then((result) => {
      // this.loading.dismiss();
      // console.log(result);
      // this.presentToast('Kaydınız yapıldı, giriş yapabilirsiniz');
      this.navCtrl.setRoot(LoginPage);
    }, (err) => {

    });
  }

}
