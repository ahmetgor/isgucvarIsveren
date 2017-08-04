import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';

/**
 * Generated class for the OzgecmisFiltrelePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ozgecmis-filtrele',
  templateUrl: 'ozgecmis-filtrele.html',
})
export class OzgecmisFiltrelePage {
  detayAra: any;
  sirala: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public events: Events) {
    this.detayAra = navParams.get('detayAra');
    console.log(JSON.stringify(this.detayAra) + 'detay')
    this.sirala = navParams.get('sirala');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OzgecmisFiltrelePage');

  }

  filtrele() {

    console.log(this.sirala+'kapatfiltre');
    console.log(JSON.stringify(this.detayAra)+'kapatfiltre');
      // console.log(JSON.stringify(this.sirala)+'parsefiltre');
    this.events.publish('ozgecmis:filtered');
    this.navCtrl.pop();
   }

   clear() {
   console.log(JSON.stringify(this.detayAra)+'clearfiltre');
   this.events.publish('ozgecmis:filtered', 'clear');
   this.navCtrl.pop();
  }

}
