import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OzgecmislerimPage } from '../ozgecmislerim/ozgecmislerim';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ilan = this.navParams.get('ilan');
    // this.basvuruList = this.navParams.get('basvurulist');
    // this.kaydedilenList = this.navParams.get('kaydedilenlist');
    this.ilanId = this.navParams.get('ilanId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IlanDetayPage');
    //Deeplink
    // if(!this.ilan) {
    //   this.ilanSer.getIlan(this.ilanId)
    //   .then((ilan) => this.ilan = ilan)
    // }
  }

  toOzgecmis() {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    console.log(JSON.stringify(this.ilan)+'ilan');
    this.navCtrl.push(OzgecmislerimPage, {
      ilanId: this.ilan._id
    });
  }
  getDays(d1) {
    // console.log(Date.parse(d1)+' date');
    let diff =  Math.floor(( (new Date()).getTime() - Date.parse(d1) ) / 86400000);
    return diff;
  }

}
