import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';
import { UserSerProvider } from '../../providers/user-ser';

@IonicPage()
@Component({
  selector: 'page-hesap',
  templateUrl: 'hesap.html',
})
export class HesapPage {
  cloudUrl: string;
  userUrl: string;
  user: any;
  password: string;
  newpassword: string;
  newpassword1: string;
  @ViewChild('userFileInput') userFileInput;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera,
              public storage: Storage, public ozgecmisSer: OzgecmisSerProvider,
              public authService: UserSerProvider) {

    this.storage.get('user')
        .then((user) => { this.user = user;
          this.userUrl = 'url(' + user.resim + ')'
          this.cloudUrl = user.resim;
          console.log(JSON.stringify(user));
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HesapPage');
  }

  updateUser(){
    // this.ozgecmisSer.updateAvatar(this.cloudUrl)
    // .then( (resUrl: any) => {
    //   this.cloudUrl = resUrl.secure_url;
    //   console.log(resUrl.secure_url+"user cloud url");

      let details : any = {
          email: this.user.email,
          userUrl: this.userUrl,
          password: this.password
      };

      if(this.newpassword) {
        details.newpassword = this.newpassword;
      }

      this.authService.updateUser(details).then((result) => {
        // this.presentToast('Kaydınız yapıldı, giriş yapabilirsiniz');
        this.navCtrl.pop();
      }, (err) => {
        // let msg = JSON.parse(err._body);
        // console.log(msg.error+'asdasd');

      });
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
        this.userUrl = 'data:image/jpg;base64,' + data;
        this.cloudUrl = this.userUrl;
        // this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        // alert('Unable to take photo');
      })
    } else {
      console.log("native");
           this.userFileInput.nativeElement.click();

    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      console.log("event");
      let imageData = (readerEvent.target as any).result;
      this.userUrl = 'url(' + imageData + ')';
      this.cloudUrl = imageData;
      // console.log(imageData);
      // console.log(JSON.stringify(readerEvent.target));
      // this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
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
