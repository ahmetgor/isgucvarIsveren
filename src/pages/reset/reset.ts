import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, } from 'ionic-angular';
import { UserSerProvider } from '../../providers/user-ser';
import { LoginPage} from '../login/login';

/**
 * Generated class for the ResetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  reset: boolean = true;
  email: string;
  password: string;
  resetPasswordToken: string;
  loading: any;
  password1: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
      public authService: UserSerProvider, public loadingCtrl: LoadingController,
      public toastCtrl: ToastController,) {}

    ionViewDidLoad() {
      console.log('ionViewDidLoad PassResetPage');
    }

    resetle(){
        // this.showLoader();
        let user = {
            email: this.email,
            prm: 'firmauser'
        };
          // console.log(JSON.stringify(credentials)+'credentials');
        this.authService.forgot(user).then((result) => {
          this.reset = !this.reset;
          // this.loading.dismiss();
          // this.navCtrl.setRoot(SonucPage);
        }, (err) => {
            // this.loading.dismiss();
              console.log(JSON.stringify(err._body)+'asdasd');
            // this.presentToast('Girdiğiniz kullanıcı geçersiz veya bağ');
        });
    }

    setPass() {
      // this.showLoader();
      let user = {
          email: this.email,
          password: this.password,
          resetPasswordToken: this.resetPasswordToken,
          prm: 'firmauser'
      };
        // console.log(JSON.stringify(credentials)+'credentials');
      this.authService.reset(user).then((result) => {
        this.reset = !this.reset;
        this.navCtrl.push(LoginPage);
        // this.loading.dismiss();
        // this.navCtrl.setRoot(SonucPage);
      }, (err) => {
          // this.loading.dismiss();
            console.log(JSON.stringify(err._body)+'asdasd');
          // this.presentToast('Girdiğiniz kullanıcı geçersiz veya bağ');
      });
    }

    showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Giriş yapılıyor...'
      });
      this.loading.present();
    }

  }
