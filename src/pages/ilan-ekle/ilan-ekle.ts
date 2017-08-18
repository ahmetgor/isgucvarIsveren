import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IlanSerProvider} from '../../providers/ilan-ser';

/**
 * Generated class for the IlanEklePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ilan-ekle',
  templateUrl: 'ilan-ekle.html',
})
export class IlanEklePage {

  detay: any;
  detayId: any;
  guncelleyen: string;
  firmaInfo: any = {};
  // orgDetay: any;
  ilanFormGroup: FormGroup;

  sehirler = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public ilanSer: IlanSerProvider,
    public toastCtrl: ToastController,public storage: Storage, public events: Events) {

      this.sehirler = ilanSer.sehirler;
      this.detayId = this.navParams.get('ilanDetayId') ? this.navParams.get('ilanDetayId') : {};
      this.guncelleyen = this.navParams.get('guncelleyen');

      //TODO: firmabilgileri
      this.firmaInfo.resim =  'https://res.cloudinary.com/isgucvar/image/upload/v1496613774/indir_xexwkb.png'
      this.firmaInfo.firma = 'I2I-System';

      // this.orgDetay = this.navParams.get('orgDetay') ? this.navParams.get('orgDetay') : {};
      ilanSer.getIlan(this.detayId)
      .then(ilan => {
        this.detay = ilan;
        this.ilanFormGroup = formBuilder.group({
              baslik: [this.detay.baslik, [Validators.required]],
              firma: [this.detay.firma],
              tip: [this.detay.tip, [Validators.required]],
              il: [this.detay.il, [Validators.maxLength(30),Validators.required]],
              askerlik: [this.detay.askerlik, [Validators.required]],
              tecrubedurum: [this.detay.tecrubedurum, [Validators.required]],
              ehliyet: [this.detay.ehliyet, [Validators.required]],
              egitimdurum: [this.detay.egitimdurum, [Validators.required]],
              aciklama: [this.detay.yilTecrube, [Validators.required]]
            });
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IlanEklePage');
  }

  add() {
    console.log(JSON.stringify(this.detay)+'detay');
    if(!this.navParams.get('update')) {
      console.log('ilan yeni ekleniyor');
      this.detay.olusturan = this.guncelleyen;
      this.detay.resim = this.firmaInfo.resim;
      this.detay.firma = this.firmaInfo.firma;
    }
    this.detay.guncelleyen = this.guncelleyen;
    // this.detayList.push(this.detay);
    // this.des = this.des.replace('Ekle', '');
    this.ilanSer.updateIlan(this.detay)
      .then((res) =>{
        // this.storage.set('ozgecmis', this.basvurulist)
      // this.orgDetay = this.detay;
      // console.log(JSON.stringify(this.orgDetay)+'orgDetay');
      this.events.publish('ilan:ekle');
      this.navCtrl.pop();
      });
  }

}
