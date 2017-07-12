import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';
import { FormControl } from '@angular/forms';
import { OzgecmisDetayPage } from '../ozgecmis-detay/ozgecmis-detay';

/**
 * Generated class for the OzgecmislerimPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ozgecmislerim',
  templateUrl: 'ozgecmislerim.html',
})
export class OzgecmislerimPage {

  aktivite: string = 'okunan';
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
              public ozgecmisSer: OzgecmisSerProvider) {
    this.searchControl = new FormControl();
    this.ilanId = this.navParams.get('ilanId');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OzgecmislerimPage');
    this.ozgecmisListele();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
    this.scrollEnable = true;
    this.skip = 0;
    // this.infiniteScroll.enable(true);
    console.log('ilanlistele searchkontrol çağrıldı');
    this.ozgecmisListele();
});
  }

  ozgecmisListele(){
    this.detayAra.basvuruId = this.ilanId;
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
      ozgecmisTapped: ozgecmis
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
