import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { OzgecmislerimPage } from '../ozgecmislerim/ozgecmislerim';
import { IlanEklePage } from '../ilan-ekle/ilan-ekle';
import { IlanSerProvider} from '../../providers/ilan-ser';
import { Storage } from '@ionic/storage';

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
              public ilanSer: IlanSerProvider, public storage: Storage) {
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

    this.events.subscribe('ilan:ekle', () => {
      console.log('ilan ekle event çağrıldı');
      console.log(this.ilan._id+'  id  '+this.ilan.id);
      this.ilanSer.getIlan(this.ilanId)
      .then(ilan => {
        this.ilan = ilan;
      });
    });
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
