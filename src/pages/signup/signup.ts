import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform } from 'ionic-angular';
import { UserSerProvider } from '../../providers/user-ser';
import { LoginPage } from '../login/login';
import { Camera } from '@ionic-native/camera';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';

// @IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild('userFileInput') userFileInput;
  @ViewChild('firmaFileInput') firmaFileInput;
  email: string;
  password: string;
  password1: string;
  firma: string;
  firmaPass: string;
  userUrl: string;
  firmaUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: UserSerProvider, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public camera: Camera, public ozgecmisSer: OzgecmisSerProvider,
    public plt: Platform) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SignupPage');
  }

  register(){
    // this.ozgecmisSer.updateAvatar(this.userUrl)
    // .then( (resUrl: any) => {
    //   this.userUrl = resUrl.secure_url;
    //   console.log(resUrl.secure_url+"user cloud url");
    // this.showLoader();
    let userDetails = {
        email: this.email,
        password: this.password,
        firma: this.firma,
        firmaPass: this.firmaPass,
        resim: this.userUrl
          };
    this.authService.createAccount(userDetails).then((result) => {
      // this.loading.dismiss();
      // console.log(result);
      // this.presentToast('Kaydınız yapıldı, giriş yapabilirsiniz');
      this.navCtrl.setRoot(LoginPage);
    }, (err) => {

    });
  // });
  }

  getPicture(url) {
    if (this.plt.is('ios') || this.plt.is('android')) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        //console.log("camera");
        if(url == 'user')
        {this.userUrl = 'data:image/jpg;base64,' + data;}
        else {this.firmaUrl = 'data:image/jpg;base64,' + data;}
        // this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        // alert('Unable to take photo');
      })
    } else {
      //console.log("native");
      if(url == 'user')
      {      this.userFileInput.nativeElement.click();
      }
      else {this.firmaFileInput.nativeElement.click();}
    }
  }

  processWebImage(event, url) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      //console.log("event");
      let imageData = (readerEvent.target as any).result;
      if(url == 'user')
      {this.userUrl = imageData;}
      else {this.firmaUrl = imageData;}
      // console.log(imageData);
      // console.log(JSON.stringify(readerEvent.target));
      // this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle(url) {
    // console.log(url+'  url');
    return 'url(' + url + ')'
  }

}
