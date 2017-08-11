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
  sehirler = [
    {"sehir":"İstanbul"},{"sehir":"Ankara"},{"sehir":"İzmir"},{"sehir":"Adana"},{"sehir":"Adıyaman"},{"sehir":"Afyonkarahisar"}
   ,{"sehir":"Ağrı"},{"sehir":"Aksaray"},{"sehir":"Amasya"},{"sehir":"Antalya"},{"sehir":"Ardahan"},{"sehir":"Artvin"}
   ,{"sehir":"Aydın"},{"sehir":"Balıkesir"},{"sehir":"Bartın"},{"sehir":"Batman"},{"sehir":"Bayburt"},{"sehir":"Bilecik"}
   ,{"sehir":"Bingöl"},{"sehir":"Bitlis"},{"sehir":"Bolu"},{"sehir":"Burdur"},{"sehir":"Bursa"},{"sehir":"Çanakkale"},{"sehir":"Çankırı"}
   ,{"sehir":"Çorum"},{"sehir":"Denizli"},{"sehir":"Diyarbakır"},{"sehir":"Düzce"},{"sehir":"Edirne"},{"sehir":"Elazığ"}
   ,{"sehir":"Erzincan"},{"sehir":"Erzurum"},{"sehir":"Eskişehir"},{"sehir":"Gaziantep"},{"sehir":"Giresun"},{"sehir":"Gümüşhane"}
   ,{"sehir":"Hakkari"},{"sehir":"Hatay"},{"sehir":"Iğdır"},{"sehir":"Isparta"},{"sehir":"Kahramanmaraş"},{"sehir":"Karabük"}
   ,{"sehir":"Karaman"},{"sehir":"Kars"},{"sehir":"Kastamonu"},{"sehir":"Kayseri"},{"sehir":"Kırıkkale"},{"sehir":"Kırklareli"}
   ,{"sehir":"Kırşehir"},{"sehir":"Kilis"},{"sehir":"Kocaeli"},{"sehir":"Konya"},{"sehir":"Kütahya"},{"sehir":"Malatya"}
   ,{"sehir":"Manisa"},{"sehir":"Mardin"},{"sehir":"Mersin"},{"sehir":"Muğla"},{"sehir":"Muş"},{"sehir":"Nevşehir"}
   ,{"sehir":"Niğde"},{"sehir":"Ordu"},{"sehir":"Osmaniye"},{"sehir":"Rize"},{"sehir":"Sakarya"},{"sehir":"Samsun"}
   ,{"sehir":"Siirt"},{"sehir":"Sinop"},{"sehir":"Sivas"},{"sehir":"Şırnak"},{"sehir":"Tekirdağ"},{"sehir":"Tokat"}
   ,{"sehir":"Trabzon"},{"sehir":"Tunceli"},{"sehir":"Şanlıurfa"},{"sehir":"Uşak"},{"sehir":"Van"},{"sehir":"Yalova"}
   ,{"sehir":"Yozgat"},{"sehir":"Zonguldak"}
  ];

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
