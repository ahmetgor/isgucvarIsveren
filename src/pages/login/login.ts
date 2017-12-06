import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { UserSerProvider } from '../../providers/user-ser';
import { IlanlarimPage } from '../ilanlarim/ilanlarim';
import { SignupPage } from '../signup/signup';
import { SignupFirmaPage} from '../signup-firma/signup-firma';
import { ResetPage} from '../reset/reset';
import { Storage } from '@ionic/storage';
// import { PassResetPage } from '../pass-reset/pass-reset';


// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  user: any
  loading: any;

  constructor(public navCtrl: NavController, public authService: UserSerProvider,
    public loadingCtrl: LoadingController, public storage: Storage, public events: Events) {
      //console.log("loginpage");
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');

    this.storage.get('user')
        .then((user) => {this.email = user.email;
          this.password = user.password;
          //console.log("storage user");
        })
        .catch((err) => {
          //console.log("hata");
          return;
        });
        this.showLoader('Bilgiler yükleniyor...');
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            //console.log("Already authorized");
            this.loading.dismiss();
            if (this.navCtrl.canGoBack()) return;
            else this.navCtrl.setRoot('IlanlarimPage');
        }, (err) => {
            // console.log("Not already authorized");
            this.loading.dismiss();
        });
    }

  login(){
      // this.showLoader('Giriş Yapılıyor...');
      let credentials = {
          email: this.email,
          password: this.password
      };
        //console.log(JSON.stringify(credentials)+'credentials');
      this.authService.login(credentials).then((result: any) => {

        //console.log(JSON.stringify(result)+"result");
        // this.loading.dismiss();
        this.navCtrl.setRoot('IlanlarimPage');

      }, (err) => {
          // this.loading.dismiss();
            //console.log(JSON.stringify(err._body)+'asdasd');
          // let msg = JSON.parse(err._body);
      });
  }

launchSignup(){
  this.navCtrl.push(SignupPage);
}

launchFirmaSignup(){
  this.navCtrl.push(SignupFirmaPage);
}

resetPass(){
  this.navCtrl.push(ResetPage);
}

showLoader(message){
  this.loading = this.loadingCtrl.create({
      content: message
  });
  this.loading.present();
}

}
