import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';

/**
 * Generated class for the OzgecmisDetayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ozgecmis-detay',
  templateUrl: 'ozgecmis-detay.html',
})
export class OzgecmisDetayPage {
  ozgecmis: any;
  userId: any;
  begenBody: any = {};
  aktivite: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ozgecmisSer: OzgecmisSerProvider) {
    this.ozgecmis = this.navParams.get('ozgecmisTapped');
    this.aktivite = this.navParams.get('aktivite');
    // this.storage.get('user')
    //     .then((user) => {
    //       this.userId = user._id;
    //     });
    this.userId = "59163aa74be8d6e2c51b8647";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OzgecmisDetayPage');
  }

  ozgecmisBegen(segment, begen) {
    this.begenBody.segment = segment;
    this.begenBody.userId = this.userId;
    this.ozgecmisSer.begenOzgecmis(this.ozgecmis._id, this.begenBody, begen);
    if (this.aktivite=="okunmadı") this.aktivite = segment;
    else this.aktivite = "okunmadı";

  }

  getAge(date) {
    return ~~(((new Date()).getTime() - (new Date(date)).getTime()) / (31557600000));
  }
}
