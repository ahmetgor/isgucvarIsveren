import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the HesapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hesap',
  templateUrl: 'hesap.html',
})
export class HesapPage {
  userUrl: string;
  user: any;
  newpassword: string;
  newpassword1: string;
  @ViewChild('userFileInput') userFileInput;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera,
              public storage: Storage, private sanitizer: DomSanitizer) {

    this.storage.get('user')
        .then((user) => { this.user = user;
          this.userUrl = 'url(' + user.resim + ')'
          console.log(JSON.stringify(user));
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HesapPage');
  }

  updateUser(){
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
      this.userUrl = 'url(' + imageData + ')';;
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
