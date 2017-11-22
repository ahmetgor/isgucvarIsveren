import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform, ActionSheetController } from 'ionic-angular';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

declare var IN;
declare var FB;
/**
 * Generated class for the OzgecmisDetayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({segment: 'ozgecmisdetay/:ozgecmisId'})
@Component({
  selector: 'page-ozgecmis-detay',
  templateUrl: 'ozgecmis-detay.html',
})
export class OzgecmisDetayPage {
  ozgecmis: any;
  ozgecmisId: string;
  userId: any;
  begenBody: any = {};
  aktivite: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ozgecmisSer: OzgecmisSerProvider, public events: Events,
              public storage: Storage, private socialSharing: SocialSharing,
              public plt: Platform, public actionSheetCtrl: ActionSheetController) {

    this.ozgecmis = this.navParams.get('ozgecmisTapped');
    this.ozgecmisId = this.navParams.get('ozgecmisId') ? this.navParams.get('ozgecmisId') : this.ozgecmis._id
    this.aktivite = this.navParams.get('aktivite');
    this.storage.get('user')
        .then((user) => {
          this.userId = user._id;
        });
    // this.userId = "59163aa74be8d6e2c51b8647";
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OzgecmisDetayPage');
    this.ozgecmisSer.getOzgecmis(this.ozgecmisId)
    .then(ozgecmis => {
      this.ozgecmis = ozgecmis;
    });
  }

  ozgecmisBegen(segment, begen) {
    this.begenBody.segment = segment;
    this.begenBody.userId = this.userId;
    this.ozgecmisSer.begenOzgecmis(this.ozgecmis._id, this.begenBody, begen);
    if (this.aktivite=="okunmadı") this.aktivite = segment;
    else this.aktivite = "okunmadı";
    this.events.publish('ozgecmis:begen');

  }

  shareFace() {
    let options = 	{
  method: "share",
  href: window.location.origin+'/#/ozgecmisdetay/'+this.ozgecmis._id,
  caption: "Such caption, very feed.",
  description: "Much description"
  // picture: this.ilan.resim
}

//console.log("share face");

  FB.ui({
  method: 'share',
  href: window.location.origin+'/#/ozgecmisdetay/'+this.ozgecmis._id,
}, function(response){});

  }

  public shareLinked(){

  var payload = {
    "comment": "Yeni bir İşgüçvar ilanı!" + window.location.origin+'/#/ozgecmisdetay/'+this.ozgecmis._id,
    "visibility": {
      "code": "anyone"
    }
  };

  IN.API.Raw("/people/~/shares?format=json")
    .method("POST")
    .body(JSON.stringify(payload))
    .result((onSuccess) =>{})
    .error((onError) =>{});
    }

  share() {
    if(!this.plt.is('core') && !this.plt.is('mobileweb')) {
  var options = {
    message: "Yeni bir İşgüçvar özgeçmişi paylaşıldı: "+this.ozgecmis.isim+"\n", // not supported on some apps (Facebook, Instagram)
    subject: 'işgüçvar özgeçmiş '+this.ozgecmis.isim, // fi. for email
    // files: [this.ilan.resim], // an array of filenames either locally or remotely
    url: window.location.origin+"/#/ozgecmisdetay/"+this.ozgecmis._id,
    chooserTitle: 'Uygulama seçin:' // Android only, you can override the default share sheet title
  }
  // this.socialSharing.shareViaFacebookWithPasteMessageHint('Message via Facebook', null, "https://isgucvar.herokuapp.com/", "paste it")
  this.socialSharing.shareWithOptions(options)
  .then((result) => {
      //console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      //console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  }).catch((msg) => {
      //console.log("Sharing failed with message: " + msg);
  });
  }
  else this.presentActionSheet();
  }

  presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Özgeçmiş Paylaş',
        buttons: [
          {
            text: 'Facebook',icon: 'logo-facebook',
            handler: () => {
              this.shareFace();
            }
          },
          // {
          //   text: 'LinkedIn',icon: 'logo-linkedin',
          //   handler: () => {
          //     this.shareLinked();
          //     console.log('Archive clicked');
          //   }
          // }
          {
            text: 'İptal',role: 'cancel',icon: 'close',
            handler: () => {
              //console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }

  getAge(date) {
    return ~~(((new Date()).getTime() - (new Date(date)).getTime()) / (31557600000));
  }
}
