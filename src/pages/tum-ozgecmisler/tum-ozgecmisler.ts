import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';
import { FormControl } from '@angular/forms';
import { OzgecmisDetayPage } from '../ozgecmis-detay/ozgecmis-detay';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TumOzgecmislerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tum-ozgecmisler',
  templateUrl: 'tum-ozgecmisler.html',
})
export class TumOzgecmislerPage {
  userId: any;
  firma: any;
  aktivite: string = 'okunmadı';
  ilanId: string;
  ozgecmisList: any;
  searching: boolean = false;
  searchTerm: string = '';
  searchControl: FormControl;
  skip: number = 0;
  limit: number = 20;
  scrollEnable: boolean = true;
  detayAra: any = {};
  sirala: any = '{}';
  showSearchbar: boolean = true;
  @ViewChild('content') content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ozgecmisSer: OzgecmisSerProvider, public storage: Storage,
              public events: Events) {
                this.searchControl = new FormControl();
                this.ilanId = this.navParams.get('ilanId');
                // this.storage.get('user')
                //     .then((user) => {
                //       this.firmaId = user.firma;
                //       this.userId = user._id;
                //     });
              this.firma = 'I2I-Systems';
              this.userId = "59163aa74be8d6e2c51b8647";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TumOzgecmislerPage');
    this.ozgecmisListele();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
    this.scrollEnable = true;
    this.skip = 0;
    // this.infiniteScroll.enable(true);
    console.log('ilanlistele searchkontrol çağrıldı');
    this.ozgecmisListele();
});
  this.events.subscribe('ozgecmis:begen', (a) => {
  this.scrollEnable = true;
  // this.infiniteScroll.enable(true);
  this.skip = 0;
  console.log('ozgecmis begen event çağrıldı');
  this.ozgecmisListele();
});
  }

  ozgecmisListele(){
    // let basvurular = [];
    // basvurular.push(this.ilanId);
    this.detayAra.userId = this.userId;
    this.detayAra.basvuruId = this.ilanId;
    this.detayAra.segment = this.aktivite;
    this.detayAra.firma = this.firma;
    this.searching = true;
    this.ozgecmisSer.getOzgecmisler(this.searchTerm, this.detayAra, this.sirala, this.skip, this.limit)
    .then(ozgecmisler => {
      this.ozgecmisList = ozgecmisler;
      console.log(JSON.stringify(this.ozgecmisList)+"basvuruya ait özgecmislist");
      this.searching = false;
    });
  }

  toOzgecmisDetay(ozgecmis: any) {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    console.log(JSON.stringify(ozgecmis)+'ozgecmisDetay');
    this.navCtrl.push(OzgecmisDetayPage, {
      ozgecmisTapped: ozgecmis,
      aktivite: this.aktivite
    });
  }

  toggleSearchbar() {
    this.showSearchbar = !this.showSearchbar;
    // this.content.resize();
  }

  toggleSegment() {
    this.showSearchbar = !this.showSearchbar;
    this.content.resize();
  }

  getAge(date) {
    return ~~(((new Date()).getTime() - (new Date(date)).getTime()) / (31557600000));
  }

  onSearchInput(){
    this.searching = true;
  }
  }
