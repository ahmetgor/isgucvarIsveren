import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ozgecmis = this.navParams.get('ozgecmisTapped');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OzgecmisDetayPage');
  }
  
  getAge(date) {
    return ~~(((new Date()).getTime() - (new Date(date)).getTime()) / (31557600000));
  }
}
