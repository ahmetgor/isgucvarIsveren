import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserSerProvider } from '../../providers/user-ser';
import { LoginPage } from '../login/login';
// import {CloudinaryModule, Cloudinary } from '@cloudinary/angular-4.x';

/**
 * Generated class for the SignupFirmaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup-firma',
  templateUrl: 'signup-firma.html',
})
export class SignupFirmaPage {

  email: string;
  password: string;
  password1: string;
  firma: string;
  firmaPass: string;
  firmaPass1: string;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public authService: UserSerProvider, public loadingCtrl: LoadingController,
      public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupFirmaPage');
  }

  registerFirma(){
    // this.showLoader();
    let details = {
        email: this.email,
        password: this.password,
        firma: this.firma,
        firmaPass: this.firmaPass
    };
    this.authService.createFirmaAccount(details).then((result) => {
      // this.presentToast('Kaydınız yapıldı, giriş yapabilirsiniz');
      this.navCtrl.setRoot(LoginPage);
    }, (err) => {
      // let msg = JSON.parse(err._body);
      // this.loading.dismiss();
      // console.log(msg.error+'asdasd');
      // this.presentToast(msg.error);
    });
  }

  // presentToast(errMsg) {
  // let toast = this.toastCtrl.create({
  //   message: errMsg,
  //   duration: 6000,
  //   position: 'top',
  //   showCloseButton: true,
  //   closeButtonText: 'OK'
  // });
  //
  // toast.onDidDismiss(() => {
  //   // console.log('Dismissed toast');
  // });
  // toast.present();
  // }

  // showLoader(){
  //
  //   this.cloudinary.openUploadWidget({
  //           upload_preset: uploadPreset,
  //           sources: [ 'local', 'url', 'image_search']
  //       },
  //       function(error, result) {console.log(error, result)}
  //   );
  // }

}
