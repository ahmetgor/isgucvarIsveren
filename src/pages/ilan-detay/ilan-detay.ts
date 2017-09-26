import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ActionSheetController, Platform } from 'ionic-angular';
import { OzgecmislerimPage } from '../ozgecmislerim/ozgecmislerim';
import { IlanEklePage } from '../ilan-ekle/ilan-ekle';
import { IlanSerProvider} from '../../providers/ilan-ser';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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

  share() {
    if(!this.plt.is('core') && !this.plt.is('mobileweb')) {
  var options = {
    message: "Yeni bir İşgüçvar ilanı paylaşıldı: "+this.ilan.baslik+"\n", // not supported on some apps (Facebook, Instagram)
    subject: 'işgüçvar ilanı '+this.ilan.baslik, // fi. for email
    // files: [this.ilan.resim], // an array of filenames either locally or remotely
    url: "http://localhost:8100/#/ilanlar/"+this.ilan._id,
    chooserTitle: 'Uygulama seçin:' // Android only, you can override the default share sheet title
  }
  // this.socialSharing.shareViaFacebookWithPasteMessageHint('Message via Facebook', null, "https://isgucvar.herokuapp.com/", "paste it")
  this.socialSharing.shareWithOptions(options)
  .then((result) => {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  }).catch((msg) => {
      console.log("Sharing failed with message: " + msg);
  });
  }
  else this.presentActionSheet();
  }

  shareFace() {
    let options = 	{
  method: "share",
  href: "https://localhost:8000/#/ilanlar/"+this.ilan._id
  // caption: "Such caption, very feed.",
  // description: "Much description"
  // picture: this.ilan.firma.resim
}
// let params: UIParams = {
//   href: 'https://isgucvar.herokuapp.com/#/ilan/'+this.ilan._id,
//   method: 'share'
// };

// if(this.plt.is('ios') || this.plt.is('android')) {
    this.face.showDialog( options)
    .then((res) => console.log(res)+"res")
    .catch((e: any) => console.error(e)+"error");
    // this.fb.ui(params)
    // .then((res: UIResponse) => console.log(res))
    // .catch((e: any) => console.error(e));
  // }
  //
  // else {
  //     this.fb.ui(params)
  //     .then((res: UIResponse) => console.log(res))
  //     .catch((e: any) => console.error(e));
  //   }
  }

  presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'İlan Paylaş',
        buttons: [
          {
            text: 'Facebook',icon: 'logo-facebook',
            handler: () => {
              this.shareFace();
            }
          },{
            text: 'LinkedIn',icon: 'logo-linkedin',
            handler: () => {
              console.log('Archive clicked');
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
