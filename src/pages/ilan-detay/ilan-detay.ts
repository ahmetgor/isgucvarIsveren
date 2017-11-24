import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ActionSheetController, Platform } from 'ionic-angular';
import { OzgecmislerimPage } from '../ozgecmislerim/ozgecmislerim';
import { IlanEklePage } from '../ilan-ekle/ilan-ekle';
import { IlanSerProvider} from '../../providers/ilan-ser';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UserSerProvider} from '../../providers/user-ser';
import { LoginPage } from '../login/login';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
// import { LinkedInService } from 'angular-linkedin-sdk';

declare var IN;
declare var FB;
/**
 * Generated class for the IlanDetayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage({segment: 'ilandetay/:ilanId'})
@Component({
  selector: 'page-ilan-detay',
  templateUrl: 'ilan-detay.html',
})
export class IlanDetayPage {
  ilan: any;
  ilanId: string;
  guncelleyen: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
              public ilanSer: IlanSerProvider, public storage: Storage,
              private socialSharing: SocialSharing, public actionSheetCtrl: ActionSheetController,
              public plt: Platform, public userAuth: UserSerProvider) {
                //console.log("ilandetay");
    this.ilan = this.navParams.get('ilan');
    this.ilanId = this.navParams.get('ilanId') ? this.navParams.get('ilanId') : this.ilan._id;
    this.guncelleyen = this.navParams.get('guncelleyen');

    // this.basvuruList = this.navParams.get('basvurulist');
    // this.kaydedilenList = this.navParams.get('kaydedilenlist');
    // this.ilanId = this.navParams.get('ilanId');
  }

  ionViewDidLoad() {

    if (!this.userAuth.currentUser) {
    this.userAuth.checkAuthentication().then((res) => {
      this.guncelleyen = this.userAuth.currentUser.email;
      this.ilanSer.getIlan(this.ilanId)
      .then(ilan => {
        this.ilan = ilan;
      });
        }, (err) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
  else{
    this.guncelleyen = this.userAuth.currentUser.email;
    this.ilanSer.getIlan(this.ilanId)
    .then(ilan => {
      this.ilan = ilan;
    });
}
    //console.log('ionViewDidLoad IlanDetayPage');

    this.events.subscribe('ilan:guncelle', () => {
      //console.log('ilan ekle event çağrıldı');
      //console.log(this.ilan._id+'  id  '+this.ilan.id);
      this.ilanSer.getIlan(this.ilanId)
      .then(ilan => {
        this.ilan = ilan;
      });
    });
  }

  shareFace() {
//     let options = 	{
//   method: "share",
// 	href: window.location.origin+'/#/ilandetay/'+this.ilan._id,
// 	caption: "Such caption, very feed.",
// 	description: "Much description"
// 	// picture: this.ilan.resim
// }

//console.log("share face");

  FB.ui({
  method: 'share',
  href: 'https://isgucvarisarayan.herokuapp.com'+'/#/detay/'+this.ilan._id,
}, function(response){});

  }

  share() {
    if(!this.plt.is('core') && !this.plt.is('mobilebrowser')) {
  var options = {
    message: "İşgüçvar ilanına göz atın:\n\n", // not supported on some apps (Facebook, Instagram)
    // subject: 'the subject', // fi. for email
    // files: [this.ilan.resim], // an array of filenames either locally or remotely
    url: 'https://isgucvarisarayan.herokuapp.com'+"/#/detay/"+this.ilan._id,
    chooserTitle: 'Uygulama seçin:' // Android only, you can override the default share sheet title
  }
  this.socialSharing.shareWithOptions(options)
  .then((result) => {
      //console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  }).catch((msg) => {
      //console.log("Sharing failed with message: " + msg);
  });
  }
  else this.presentActionSheet();
  }

  // public shareLinked(){
  //
  // var payload = {
  //   "comment": "Yeni bir İşgüçvar ilanı!" + window.location.origin+'/#/ilandetay/'+this.ilan._id,
  //   "visibility": {
  //     "code": "anyone"
  //   }
  // };
  //
  // IN.API.Raw("/people/~/shares?format=json")
  //   .method("POST")
  //   .body(JSON.stringify(payload))
  //   .result((onSuccess) =>{})
  //   .error((onError) =>{});
  //   }

  presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'İlan Paylaş',
        buttons: [
          {
            text: 'Facebook',
            icon: 'logo-facebook',
            handler: () => {
              this.shareFace();
            }
          },
          // {
          //   text: 'LinkedIn',
          //   icon: 'logo-linkedin',
          //   handler: () => {
          //     console.log('Archive clicked');
          //     this.shareLinked();
          //   }
          // },
          {
            text: 'İptal',
            role: 'cancel',
            icon: 'close',
            handler: () => {
              //console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }


  toOzgecmis() {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    //console.log(JSON.stringify(this.ilan)+'ilan');
    this.navCtrl.push('OzgecmislerimPage', {
        ilanId: this.ilan._id,
      guncelleyen: this.guncelleyen
    });
  }

  guncelleIlan() {
    //console.log(JSON.stringify(this.ilan)+'ilan');
    this.navCtrl.push('IlanEklePage', {
      ilanDetayId: this.ilan._id,
      update: 'Y'
    });
  }

  getDays(d1) {
    // console.log(Date.parse(d1)+' date');
    let diff =  Math.floor(( (new Date()).getTime() - Date.parse(d1) ) / 86400000);
    return diff;
  }

}
