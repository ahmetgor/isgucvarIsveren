import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';
import { FormControl } from '@angular/forms';
import { OzgecmisDetayPage } from '../ozgecmis-detay/ozgecmis-detay';
import { OzgecmisFiltrelePage } from '../ozgecmis-filtrele/ozgecmis-filtrele';
import { Storage } from '@ionic/storage';
import { UserSerProvider } from '../../providers/user-ser';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/debounceTime';

@IonicPage({})
@Component({
  selector: 'page-ozgecmislerim',
  templateUrl: 'ozgecmislerim.html',
})
export class OzgecmislerimPage {
  olusturan: any;
  userId: any;
  aktivite: string = 'okunmadı';
  ilanId: string;
  ozgecmisList: any;
  searching: boolean = false;
  searchTerm: string = '';
  searchControl: FormControl;
  skip: number = 0;
  limit: number = 10;
  scrollEnable: boolean = true;
  detayAra: any = {};
  sirala: any = '{}';
  showSearchbar: boolean = true;
  @ViewChild('content') content: Content;
  isEmpty: boolean = false;
  cv_count: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ozgecmisSer: OzgecmisSerProvider, public storage: Storage,
              public events: Events, public userAuth: UserSerProvider) {
                this.searchControl = new FormControl();

  }

  ionViewDidLoad() {
    if (!this.userAuth.currentUser) {
    this.userAuth.checkAuthentication().then((res) => {
      this.ilanId = this.navParams.get('ilanId');
      this.userId = this.userAuth.currentUser._id;
      this.olusturan = this.userAuth.currentUser.email;
      //console.log("constructor çağrıldı");
      this.ozgecmisListele();

    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
  else {
  this.ilanId = this.navParams.get('ilanId');

        this.userId = this.userAuth.currentUser._id;
        this.olusturan = this.userAuth.currentUser.email;
        //console.log("constructor çağrıldı");
        this.ozgecmisListele();
      // });
    }
    //console.log('ionViewDidLoad OzgecmislerimPage');

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
    this.scrollEnable = true;
    this.skip = 0;
    // this.infiniteScroll.enable(true);
    //console.log('ilanlistele searchkontrol çağrıldı');
    this.ozgecmisListele();
});

this.events.subscribe('ozgecmis:begen', (a) => {
  this.scrollEnable = true;
  // this.infiniteScroll.enable(true);
  this.skip = 0;
  // if(a) {
  //   this.detayAra = {};
  //   this.sirala = '{}';
  // }
  //console.log('ozgecmis begen event çağrıldı');
  this.ozgecmisListele();
});

this.events.subscribe('ozgecmis:filtered_tek', (a) => {
  this.scrollEnable = true;
  // this.infiniteScroll.enable(true);
  this.skip = 0;
  if(a) {
    //console.log('filtre true');
    this.detayAra = {};
    this.sirala = '{}';
  }
  //console.log('ozgecmislistele filtre çağrıldı');
  this.ozgecmisListele();

});
  }

  ozgecmisListele(){

    this.isEmpty = false;
    this.detayAra.basvuruId = this.ilanId;
    this.detayAra.olusturan = this.olusturan;
    this.detayAra.segment = this.aktivite;
    this.detayAra.userId = this.userId;
    this.searching = true;
    this.ozgecmisSer.getOzgecmisler(this.searchTerm, this.detayAra, this.sirala, this.skip, this.limit)
    .then(ozgecmisler => {
      this.ozgecmisList = ozgecmisler;
      console.log(this.ozgecmisList.length);
      this.cv_count = this.ozgecmisList.length;
      //console.log(JSON.stringify(this.ozgecmisList)+"basvuruya ait özgecmislist");
      if (Object.keys(this.ozgecmisList).length <= 0) {
        this.isEmpty = true;
      }
      this.searching = false;
    });
  }

  toOzgecmisDetay(ozgecmis: any) {
    // //console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
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
      page: 'tek'
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
