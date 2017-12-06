import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';
import { UserSerProvider } from '../../providers/user-ser';
import { IlanSerProvider } from '../../providers/ilan-ser';
import { LoginPage} from '../login/login';

// @IonicPage()
@Component({
  selector: 'page-firma-hesap',
  templateUrl: 'firma-hesap.html',
})
export class FirmaHesapPage {
  cloudUrl: string;
  userUrl: string;
  user: any;
  userList: any;
  password: string;
  newpassword: string = "";
  newpassword1: string = "";
  @ViewChild('userFileInput') userFileInput;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera,
              public storage: Storage, public ozgecmisSer: OzgecmisSerProvider,
              public authService: UserSerProvider, public ilanService: IlanSerProvider) {

      if (!this.authService.currentUser) {
      this.authService.checkAuthentication().then((res) => {
      }, (err) => {
        this.navCtrl.setRoot(LoginPage);
      });
    }
    else {
    this.storage.get('user')
        .then((user) => { this.user = user;
          this.userUrl = 'url(' + user.firmaresim + ')';
          this.cloudUrl = user.firmaresim;

          this.ilanService.getUsers(user.firmaId)
          .then((userList) => {this.userList = userList;
        });
          // console.log(JSON.stringify(user));
        });
      }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FirmaHesapPage');
    this.newpassword = "";
    this.newpassword1 = "";
  }

  updateUser(){
    // this.ozgecmisSer.updateAvatar(this.cloudUrl)
    // .then( (resUrl: any) => {
    //   this.cloudUrl = resUrl.secure_url;
    //   console.log(resUrl.secure_url+"user cloud url");

      let details : any = {
          firma: this.user.firma,
          userUrl: this.cloudUrl,
          email: this.user.email
      };

      if(this.newpassword.trim() && this.newpassword.trim()!= "") {
        details.newpassword = this.newpassword;
      }
      //console.log(JSON.stringify(details));
      this.authService.updateFirma(details).then((result) => {
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
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        //console.log("camera");
        this.userUrl = 'data:image/jpg;base64,' + data;
        this.cloudUrl = this.userUrl;
        // this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        // alert('Unable to take photo');
      })
    } else {
      //console.log("native");
           this.userFileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      //console.log("event");
      let imageData = (readerEvent.target as any).result;
      this.userUrl = 'url(' + imageData + ')';
      this.cloudUrl = imageData;

    };
    reader.readAsDataURL(event.target.files[0]);
  }

  updateUserEnabled(usr: any){
      let details : any = {
          email: usr.email,
          enabled: usr.enabled,
          en: 'en'
      };
      this.authService.updateUser(details).then((result) => {
      }, (err) => {
        // console.log(msg.error+'asdasd');
      });
  }

}
