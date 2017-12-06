import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { IlanSerProvider} from '../../providers/ilan-ser';

/**
 * Generated class for the IlanFiltrelePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-ilan-filtrele',
  templateUrl: 'ilan-filtrele.html',
})
export class IlanFiltrelePage {
  detayAra: any;
  sirala: any;
  ilanlarim: String;
  sehirler = [
  //   {"sehir":"İstanbul"},{"sehir":"Ankara"},{"sehir":"İzmir"},{"sehir":"Adana"},{"sehir":"Adıyaman"},{"sehir":"Afyonkarahisar"}
  //  ,{"sehir":"Ağrı"},{"sehir":"Aksaray"},{"sehir":"Amasya"},{"sehir":"Antalya"},{"sehir":"Ardahan"},{"sehir":"Artvin"}
  //  ,{"sehir":"Aydın"},{"sehir":"Balıkesir"},{"sehir":"Bartın"},{"sehir":"Batman"},{"sehir":"Bayburt"},{"sehir":"Bilecik"}
  //  ,{"sehir":"Bingöl"},{"sehir":"Bitlis"},{"sehir":"Bolu"},{"sehir":"Burdur"},{"sehir":"Bursa"},{"sehir":"Çanakkale"},{"sehir":"Çankırı"}
  //  ,{"sehir":"Çorum"},{"sehir":"Denizli"},{"sehir":"Diyarbakır"},{"sehir":"Düzce"},{"sehir":"Edirne"},{"sehir":"Elazığ"}
  //  ,{"sehir":"Erzincan"},{"sehir":"Erzurum"},{"sehir":"Eskişehir"},{"sehir":"Gaziantep"},{"sehir":"Giresun"},{"sehir":"Gümüşhane"}
  //  ,{"sehir":"Hakkari"},{"sehir":"Hatay"},{"sehir":"Iğdır"},{"sehir":"Isparta"},{"sehir":"Kahramanmaraş"},{"sehir":"Karabük"}
  //  ,{"sehir":"Karaman"},{"sehir":"Kars"},{"sehir":"Kastamonu"},{"sehir":"Kayseri"},{"sehir":"Kırıkkale"},{"sehir":"Kırklareli"}
  //  ,{"sehir":"Kırşehir"},{"sehir":"Kilis"},{"sehir":"Kocaeli"},{"sehir":"Konya"},{"sehir":"Kütahya"},{"sehir":"Malatya"}
  //  ,{"sehir":"Manisa"},{"sehir":"Mardin"},{"sehir":"Mersin"},{"sehir":"Muğla"},{"sehir":"Muş"},{"sehir":"Nevşehir"}
  //  ,{"sehir":"Niğde"},{"sehir":"Ordu"},{"sehir":"Osmaniye"},{"sehir":"Rize"},{"sehir":"Sakarya"},{"sehir":"Samsun"}
  //  ,{"sehir":"Siirt"},{"sehir":"Sinop"},{"sehir":"Sivas"},{"sehir":"Şırnak"},{"sehir":"Tekirdağ"},{"sehir":"Tokat"}
  //  ,{"sehir":"Trabzon"},{"sehir":"Tunceli"},{"sehir":"Şanlıurfa"},{"sehir":"Uşak"},{"sehir":"Van"},{"sehir":"Yalova"}
  //  ,{"sehir":"Yozgat"},{"sehir":"Zonguldak"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public events: Events, public ilanSer: IlanSerProvider) {

    this.sehirler = ilanSer.sehirler;
    this.detayAra = navParams.get('detayAra');
    //console.log(JSON.stringify(this.detayAra) + 'detay')
    this.sirala = navParams.get('sirala');
    this.ilanlarim = navParams.get('ilanlarim');
    //console.log(this.ilanlarim);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad IlanFiltrelePage'+this.ilanlarim);

  }

  filtrele() {

    //console.log(this.sirala+'kapatfiltre');
    //console.log(JSON.stringify(this.detayAra)+'kapatfiltre');
      // console.log(JSON.stringify(this.sirala)+'parsefiltre');
      if (this.ilanlarim == "ilan") {
        //console.log("ilan filter");
    this.events.publish('ilan:filteredilan', "");
  }
  else {this.events.publish('ilan:filteredtumilan', "");
        // console.log("tumilan filter");
        }
    this.navCtrl.pop();
   }

   clear() {
   //console.log(JSON.stringify(this.detayAra)+'clearfiltre');
   if (this.ilanlarim == "ilan") {
     //console.log("ilan clear");
 this.events.publish('ilan:filteredilan', "clear");
}
  else {this.events.publish('ilan:filteredtumilan', "clear");
     //console.log("tumilan clear");
     }   this.navCtrl.pop();
  }
}
