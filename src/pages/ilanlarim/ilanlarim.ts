import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, Events, IonicPage} from 'ionic-angular';
import { IlanSerProvider } from '../../providers/ilan-ser';
import { IlanDetayPage } from '../ilan-detay/ilan-detay';
import { IlanFiltrelePage } from '../ilan-filtrele/ilan-filtrele';
import { FormControl } from '@angular/forms';
import { UserSerProvider} from '../../providers/user-ser';
import 'rxjs/add/operator/debounceTime';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the IlanlarimPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ilanlarim',
  templateUrl: 'ilanlarim.html',
})
export class IlanlarimPage {
  ilanList: any;
  // basvuruList: any;
  // kaydedilenList: any;
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

      // this.detayAra.olusturan = this.userAuth.user.email;
      // TODO: storage
      this.storage.get('user')
          .then((user) => { this.user = user;
            console.log(JSON.stringify(user));
            this.detayAra.olusturan = this.user.email;
            this.ilanListele();
          });
      this.searchControl = new FormControl();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IlanlarimPage');
    console.log('ionViewDidLoad SonucPage çağrıldı');
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
    this.scrollEnable = true;
    this.skip = 0;
    console.log('ilanlistele searchkontrol çağrıldı');
    this.ilanListele();

    console.log('searchkontrol çağrıldı');
  // }
});
this.events.subscribe('ilan:filteredilan', (a) => {
  this.scrollEnable = true;
  // this.infiniteScroll.enable(true);
  this.skip = 0;
  if(a == "clear") {
    // console.log('filtre true');
    this.detayAra = {};
    this.detayAra.olusturan = this.user.email;
    this.sirala = '{}';
  }
  console.log('ilanlistele filtre çağrıldı');
  this.ilanListele();
});

this.events.subscribe('ilan:ekle', () => {
  console.log('ilan ekle event çağrıldı');
  this.scrollEnable = true;
  this.skip = 0;
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
      ilan: ilan,
      guncelleyen: this.detayAra.olusturan
      // basvurulist: this.basvuruSer.basvuruList,
      // kaydedilenlist: this.basvuruSer.kaydedilenList
    });
  }

  presentFilter(myEvent) {
    this.navCtrl.push(IlanFiltrelePage, {
      detayAra: this.detayAra,
      sirala: this.sirala,
      ilanlarim: 'ilan'
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
