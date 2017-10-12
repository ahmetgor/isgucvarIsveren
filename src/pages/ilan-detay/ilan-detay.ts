import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ActionSheetController, Platform } from 'ionic-angular';
import { OzgecmislerimPage } from '../ozgecmislerim/ozgecmislerim';
import { IlanEklePage } from '../ilan-ekle/ilan-ekle';
import { IlanSerProvider} from '../../providers/ilan-ser';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { LinkedInService } from 'angular-linkedin-sdk';
// declare var IN;

/**
 * Generated class for the IlanDetayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
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
              public plt: Platform, private face: Facebook) {
                console.log("ilandetay");
    this.ilan = this.navParams.get('ilan');
    this.ilanId = this.navParams.get('ilanId') ? this.navParams.get('ilanId') : this.ilan._id;

    this.guncelleyen = this.navParams.get('guncelleyen');
    this.storage.get('user')
        .then((user) => {
          this.guncelleyen = user.email;
        });
    // this.basvuruList = this.navParams.get('basvurulist');
    // this.kaydedilenList = this.navParams.get('kaydedilenlist');
    // this.ilanId = this.navParams.get('ilanId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IlanDetayPage');
    this.ilanSer.getIlan(this.ilanId)
    .then(ilan => {
      this.ilan = ilan;
    });
    this.events.subscribe('ilan:ekle', () => {
      console.log('ilan ekle event çağrıldı');
      console.log(this.ilan._id+'  id  '+this.ilan.id);
      this.ilanSer.getIlan(this.ilanId)
      .then(ilan => {
        this.ilan = ilan;
      });
    });
  }

  shareface() {

    this.socialSharing.shareViaFacebook
    ('İşgüçvar ilanına göz atın:', null, "https://isgucvar.herokuapp.com/")

  }

  share() {
    if(!this.plt.is('core') && !this.plt.is('mobilebrowser')) {
  var options = {
    message: "İşgüçvar ilanına göz atın:\n\n", // not supported on some apps (Facebook, Instagram)
    // subject: 'the subject', // fi. for email
    // files: [this.ilan.resim], // an array of filenames either locally or remotely
    url: "https://isgucvar.herokuapp.com/#/ilan/"+this.ilan._id,
    chooserTitle: 'Uygulama seçin:' // Android only, you can override the default share sheet title
  }
  this.socialSharing.shareWithOptions(options)
  .then((result) => {
      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  }).catch((msg) => {
      console.log("Sharing failed with message: " + msg);
  });
  }
  else this.presentActionSheet();
  }

  public sharelinked(){
//     var payload = {
//   "comment": "Check out developer.linkedin.com! http://linkd.in/1FC2PyG",
//   "visibility": {
//     "code": "anyone"
//   }
// };
// console.log('linked');
//       const url = '/people/~/shares?format=json';
//       this.linkedIn.raw(url)
//         // .asObservable()
//         // .method('POST')
//         // .body(JSON.stringify(payload))
//         .asObservable()
//           .subscribe({
//             next: (data) => {
//               console.log(data);
//             },
//             error: (err) => {
//               console.log(err);
//             },
//             complete: () => {
//               console.log('RAW API call completed');
//             }
//           });
  }
  presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'İlan Paylaş',
        buttons: [
          {
            text: 'Facebook',icon: 'logo-facebook',
            handler: () => {
              this.shareface();
            }
          },{
            text: 'LinkedIn',icon: 'logo-linkedin',
            handler: () => {
              console.log('Archive clicked');
              this.sharelinked();
            }
          },{
            text: 'İptal',role: 'cancel',icon: 'close',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }


  toOzgecmis() {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    console.log(JSON.stringify(this.ilan)+'ilan');
    this.navCtrl.push(OzgecmislerimPage, {
      ilanId: this.ilan._id,
      guncelleyen: this.guncelleyen
    });
  }

  guncelleIlan() {
    console.log(JSON.stringify(this.ilan)+'ilan');
    this.navCtrl.push(IlanEklePage, {
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
