import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform  } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';
import { UserSerProvider } from '../../providers/user-ser';
import { LoginPage} from '../login/login';

// @IonicPage()
@Component({
  selector: 'page-hesap',
  templateUrl: 'hesap.html',
})
export class HesapPage {
  cloudUrl: string;
  userUrl: string;
  user: any;
  password: string;
  newpassword: string = "";
  newpassword1: string = "";
  @ViewChild('userFileInput') userFileInput;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera,
              public storage: Storage, public ozgecmisSer: OzgecmisSerProvider,
              public authService: UserSerProvider,  public plt: Platform) {

      if (!this.authService.currentUser) {
      this.authService.checkAuthentication().then((res) => {
      }, (err) => {
        this.navCtrl.setRoot(LoginPage);
      });
    }
    else {
    this.storage.get('user')
        .then((user) => { this.user = user;
          this.userUrl = 'url(' + user.resim + ')';
          this.cloudUrl = user.resim;
          //console.log(JSON.stringify(user));
        });
      }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HesapPage');
    this.newpassword = "";
    this.newpassword1 = "";
  }

  updateUser(){
    // this.ozgecmisSer.updateAvatar(this.cloudUrl)
    // .then( (resUrl: any) => {
    //   this.cloudUrl = resUrl.secure_url;
    //   console.log(resUrl.secure_url+"user cloud url");

      let details : any = {
          email: this.user.email,
          userUrl: this.cloudUrl
      };

      if(this.newpassword.trim() && this.newpassword.trim()!= "") {
        details.newpassword = this.newpassword;
      }

      this.authService.updateUser(details).then((result) => {
        // this.presentToast('Kaydınız yapıldı, giriş yapabilirsiniz');
          this.authService.logout();
          this.navCtrl.setRoot(LoginPage);

      }, (err) => {
        // let msg = JSON.parse(err._body);
        // console.log(msg.error+'asdasd');
      });
    // });
  }

  getPicture(url) {
    if (this.plt.is('ios') || this.plt.is('android')) {
      this.camera.getPicture({
        sourceType : 0,
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 300,
        targetHeight: 300,
        allowEdit: true,
        quality: 70
      }).then((data) => {
        //console.log("camera");
        this.userUrl = 'data:image/jpg;base64,' + data;
        this.cloudUrl = this.userUrl;
        // this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        // alert('Unable to take photo');
      })
    }
    else {
      //console.log("native");
           this.userFileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    let imageData = new Image();
    var canvas = document.createElement('canvas');
    let dataUrl = undefined;
    reader.onload = (readerEvent) => {
      //console.log("event");
      dataUrl = (readerEvent.target as any).result;
      // console.log(imageData.src+"src");
      // canvas.getContext("2d").drawImage(imageData, 0, 0);
      // let dataUrl = canvas.toDataURL('image/jpg');
      //console.log(dataUrl);
      //console.log(dataUrl.length);
      this.userUrl = 'url(' + dataUrl + ')';
      this.cloudUrl = dataUrl;
      // console.log(imageData);
      // console.log(JSON.stringify(readerEvent.target));
      // this.form.patchValue({ 'profilePic': imageData });
    };
    reader.readAsDataURL(event.target.files[0]);
    //console.log(event.target.files[0]);

  }

  // getProfileImageStyle(url) {
  //   console.log(url+'  url');
  //   console.log(this.user.resim+'  resim');
  //
  //   if(url)
  //   return 'url(' + url + ')';
  //
  //   else return this.user.resim;
  // }

}
