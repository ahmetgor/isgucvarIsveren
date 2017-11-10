import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, IonicPage} from 'ionic-angular';
import { IlanSerProvider } from '../../providers/ilan-ser';
import { IlanDetayPage } from '../ilan-detay/ilan-detay';
import { FormControl } from '@angular/forms';
import { UserSerProvider} from '../../providers/user-ser';
import { IlanFiltrelePage } from '../ilan-filtrele/ilan-filtrele';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the TumIlanlarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tum-ilanlar',
  templateUrl: 'tum-ilanlar.html',
})
export class TumIlanlarPage {

  ilanList: any;
  detayAra: any = {};
  sirala: any = '{}';
  searching: boolean = false;
  searchTerm: string = '';
  searchControl: FormControl;
  skip: number = 0;
  limit: number = 20;
  scrollEnable: boolean = true;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ilanSer: IlanSerProvider, public modalCtrl: ModalController,
    public events: Events, public userAuth: UserSerProvider, public storage: Storage) {
      this.searchControl = new FormControl();

      if (!this.userAuth.currentUser) {
      this.userAuth.checkAuthentication().then((res) => {
        console.log('tumilan constructor');
        this.detayAra.firma = this.userAuth.currentUser.firma;
        this.ilanListele();
      }, (err) => {

        console.log('tumilan constructor1');
        this.navCtrl.setRoot(LoginPage);
      });
    }
    else {
      // this.storage.get('user')
      //     .then((user) => { this.user = user;
            console.log(this.userAuth.currentUser.firma);
            this.detayAra.firma = this.userAuth.currentUser.firma;
            this.ilanListele();
            console.log('tumilan constructor');

          // });
      // this.detayAra.firma = this.userAuth.user.firma;
      // this.detayAra.firma = "I2I-Systems";
    }
    console.log('tumilan constructor3');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TumIlanlarPage');
    console.log('ionViewDidLoad SonucPage çağrıldı');
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
    this.scrollEnable = true;
    this.skip = 0;
    // this.infiniteScroll.enable(true);
    console.log('ilanlistele searchkontrol çağrıldı');
    this.ilanListele();

    console.log('searchkontrol çağrıldı');
  // }
});

this.events.subscribe('ilan:filteredtumilan', (a) => {
  this.scrollEnable = true;
  // this.infiniteScroll.enable(true);
  this.skip = 0;
  if(a == "clear") {
    // console.log('filtre true');
    this.detayAra = {};
    this.detayAra.firma = this.userAuth.currentUser.firma;
    this.sirala = '{}';
  }
  console.log('tümilanlistele filtre çağrıldı');
  this.ilanListele();
});
  }

  ilanListele() {
    this.searching = true;
    this.ilanSer.getIlanlar(this.searchTerm, this.detayAra, this.sirala, this.skip, this.limit)
    .then(ilanlar => {
      this.ilanList = ilanlar;
      // console.log(JSON.stringify(this.ilanList));
      this.searching = false;
    });
  }

  itemTapped(ev, ilan) {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    console.log(JSON.stringify(ilan)+'ilan');
    this.navCtrl.push(IlanDetayPage, {
      ilan: ilan
      // basvurulist: this.basvuruSer.basvuruList,
      // kaydedilenlist: this.basvuruSer.kaydedilenList
    });
  }

  presentFilter(myEvent) {
    this.navCtrl.push(IlanFiltrelePage, {
      detayAra: this.detayAra,
      sirala: this.sirala,
      ilanlarim: 'tumilan'
    });
  }

  doInfinite(infiniteScroll) {
  console.log('Begin async operation');
  // this.infiniteScroll = infiniteScroll;
  // infiniteScroll.enable(true);
  // infiniteScroll.enable(false);

  setTimeout(() => {
    this.skip = this.skip + 1;
    this.ilanSer.getIlanlar(this.searchTerm, this.detayAra, this.sirala, this.skip, this.limit)
    .then(ilanlar => {
      console.log(JSON.stringify(ilanlar)+"ilanlar");

      if(Object.keys(ilanlar).length < this.limit) {
        console.log('true');
        // infiniteScroll.enable(false);
        this.scrollEnable = false;
        ;}

      console.log('false');
      // infiniteScroll.enable(true);
      // this.scrollEnable = true;
      for( var key in ilanlar ) {
    this.ilanList.push(ilanlar[key]);
  }
    });
    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}

getDays(d1) {
    // console.log(d1);
    // console.log(JSON.stringify(d1)+'datedate');
    // console.log((new Date(d1)).getTime() +' date'+ (new Date()).getTime());
  let diff =  Math.floor(( (new Date()).getTime() - (new Date(d1)).getTime() ) / 86400000);
  return diff;
}

onSearchInput(){
  this.searching = true;
}

}
