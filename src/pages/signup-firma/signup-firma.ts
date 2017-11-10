import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserSerProvider } from '../../providers/user-ser';
import { LoginPage } from '../login/login';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-signup-firma',
  templateUrl: 'signup-firma.html',
})
export class SignupFirmaPage {
  @ViewChild('userFileInput') userFileInput;
  @ViewChild('firmaFileInput') firmaFileInput;
  email: string;
  password: string;
  password1: string;
  firma: string;
  firmaPass: string;
  firmaPass1: string;
  loading: any;
  userUrl: string;
  firmaUrl: string;
  telefon: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public authService: UserSerProvider, public loadingCtrl: LoadingController,
      public toastCtrl: ToastController, public camera: Camera,
      public ozgecmisSer: OzgecmisSerProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupFirmaPage');
  }

  registerFirma(){

    // this.ozgecmisSer.updateAvatar(this.userUrl)
    // .then( (resUrl: any) => {
    //   this.userUrl = resUrl.secure_url;
    //   console.log(resUrl.secure_url+"user cloud url");
    //
    //   this.ozgecmisSer.updateAvatar(this.firmaUrl)
    //   .then( (resUrlfirma: any) => {
    //     this.firmaUrl = resUrlfirma.secure_url;
    //     console.log(resUrlfirma.secure_url + "firma cloud url");
      // console.log(resUrl.secure_url+'secure');

    let details = {
        email: this.email,
        password: this.password,
        firma: this.firma,
        firmaPass: this.firmaPass,
        userUrl: this.userUrl,
        firmaUrl: this.firmaUrl,
        telefon: this.telefon
    };
    this.authService.createFirmaAccount(details).then((result) => {
      // this.presentToast('Kaydınız yapıldı, giriş yapabilirsiniz');
      this.navCtrl.setRoot(LoginPage);
    }, (err) => {
      // let msg = JSON.parse(err._body);
      // console.log(msg.error+'asdasd');

    });
//   });
// });

  }

  getPicture(url) {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        console.log("camera");
        if(url == 'user')
        {this.userUrl = 'data:image/jpg;base64,' + data;}
        else {this.firmaUrl = 'data:image/jpg;base64,' + data;}
        // this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        // alert('Unable to take photo');
      })
    } else {
      console.log("native");
      if(url == 'user')
      {      this.userFileInput.nativeElement.click();
      }
      else {this.firmaFileInput.nativeElement.click();}
    }
  }

  processWebImage(event, url) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      console.log("event");
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
