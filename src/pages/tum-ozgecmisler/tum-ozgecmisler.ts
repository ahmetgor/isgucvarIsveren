import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';
import { FormControl } from '@angular/forms';
import { OzgecmisDetayPage } from '../ozgecmis-detay/ozgecmis-detay';
import { OzgecmisFiltrelePage } from '../ozgecmis-filtrele/ozgecmis-filtrele';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { UserSerProvider } from '../../providers/user-ser';
import 'rxjs/add/operator/debounceTime';

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
  sirala: any = {};
  showSearchbar: boolean = true;
  isEmpty: boolean = false;
  @ViewChild('content') content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ozgecmisSer: OzgecmisSerProvider, public storage: Storage,
              public events: Events, public userAuth: UserSerProvider ) {
                this.searchControl = new FormControl();

  }

  ionViewDidLoad() {

    if (!this.userAuth.currentUser) {
    this.userAuth.checkAuthentication().then((res) => {
      this.firma = this.userAuth.currentUser.firmaId;
      this.userId = this.userAuth.currentUser._id;
      this.ozgecmisListele();
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
  else {
    // this.storage.get('user')
    //     .then((user) => {
          this.firma = this.userAuth.currentUser.firmaId;
          this.userId = this.userAuth.currentUser._id;
          this.ozgecmisListele();
        // });
            // this.ilanId = this.navParams.get('ilanId');
            this.detayAra.tumfirma = 't';
          }
    //cı.log('ionViewDidLoad TumOzgecmislerPage');

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      console.log('ilanlistele searchkontrol çağrıldı');
    this.scrollEnable = true;
    this.skip = 0;
    console.log('ilanlistele searchkontrol çağrıldı');
    this.ozgecmisListele();
});

  this.events.subscribe('ozgecmis:begen', (a) => {
  this.scrollEnable = true;
  // this.infiniteScroll.enable(true);
  this.skip = 0;
  //cı.log('ozgecmis begen event çağrıldı');
  this.ozgecmisListele();
});

this.events.subscribe('ozgecmis:filtered_tüm', (a) => {
  this.scrollEnable = true;
  // this.infiniteScroll.enable(true);
  this.skip = 0;
  if(a) {
    // console.log('filtre true');
    this.detayAra = {};
    // this.firma = 'I2I-Systems';
    this.sirala = {};
  }
  //console.log('ozgecmislistele filtre çağrıldı');
  this.ozgecmisListele();

});
  }

  ozgecmisListele(){
    // let basvurular = [];
    // basvurular.push(this.ilanId);
    this.detayAra.userId = this.userId;
    this.isEmpty = false;
    this.detayAra.segment = this.aktivite;
    if (this.detayAra.tumfirma == 'f')  this.detayAra.firma = this.firma;
    else this.detayAra.firma = undefined;
    this.searching = true;
    this.ozgecmisSer.getOzgecmisler(this.searchTerm, this.detayAra, this.sirala, this.skip, this.limit)
    .then(ozgecmisler => {
      this.ozgecmisList = ozgecmisler;
      console.log(JSON.stringify(this.ozgecmisList)+"basvuruya ait özgecmislist");
      if (Object.keys(this.ozgecmisList).length <= 0) {
        this.isEmpty = true;
      }
      console.log(JSON.stringify(this.ozgecmisList)+"basvuruya ait özgecmislist");
      this.searching = false;
    });
  }

  toOzgecmisDetay(ozgecmis: any) {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    //console.log(JSON.stringify(ozgecmis)+'ozgecmisDetay');
    this.navCtrl.push('OzgecmisDetayPage', {
      ozgecmisTapped: ozgecmis,
      aktivite: this.aktivite,
      ozgecmisId: ozgecmis._id
    });
  }

  presentFilter(myEvent) {
    this.navCtrl.push(OzgecmisFiltrelePage, {
      detayAra: this.detayAra,
      sirala: this.sirala,
      page: 'tüm'
    });
  }

  doInfinite(infiniteScroll) {

  setTimeout(() => {
    this.skip = this.skip + 1;
    this.ozgecmisSer.getOzgecmisler(this.searchTerm, this.detayAra, this.sirala, this.skip, this.limit)
    .then(ozgecmisler => {
      //console.log(JSON.stringify(ilanlar)+"ilanlar");

      if(Object.keys(ozgecmisler).length < this.limit) {

        this.scrollEnable = false;
        ;}

      for( var key in ozgecmisler ) {
    this.ozgecmisList.push(ozgecmisler[key]);
  }
    });
    //console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);

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
