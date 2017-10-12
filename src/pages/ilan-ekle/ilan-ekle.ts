import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IlanSerProvider} from '../../providers/ilan-ser';
import { IlanlarimPage } from '../ilanlarim/ilanlarim';

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

  detay: any = {};
  detayId: any;
  guncelleyen: string;
  // firmaInfo: any = {};
  user: any;
  // orgDetay: any;
  ilanFormGroup: FormGroup;

  sehirler = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public ilanSer: IlanSerProvider,
    public toastCtrl: ToastController,public storage: Storage, public events: Events) {

      this.sehirler = ilanSer.sehirler;
      // console.log(JSON.stringify(this.sehirler));
      this.detayId = this.navParams.get('ilanDetayId');
      this.storage.get('user')
          .then((user) => { this.user = user;
            this.detay.firmaAdi = this.user.firma;
            this.guncelleyen = this.user.email;
          });
      // this.guncelleyen = this.navParams.get('guncelleyen');

      //TODO: firmabilgileri
      // this.firmaInfo.resim =  'https://res.cloudinary.com/isgucvar/image/upload/v1496613774/indir_xexwkb.png'
      // this.firmaInfo.firma = 'I2I-System';
      this.detay.enabled = true;

      // this.orgDetay = this.navParams.get('orgDetay') ? this.navParams.get('orgDetay') : {};
      if(this.detayId) {
      ilanSer.getIlan(this.detayId)
      .then(ilan => {
        this.detay = ilan;
        this.detay.firmaAdi = this.user.firma;
      });

      }

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IlanEklePage');
  }

  add() {
    console.log(JSON.stringify(this.detay)+'detay');
    console.log(JSON.stringify(this.user)+'detay');

    this.detay.guncelleyen = this.guncelleyen;
    this.detay.firma = this.user.firmaId;
    if(!this.navParams.get('update')) {
      console.log('ilan yeni ekleniyor');
      this.detay.olusturan = this.guncelleyen;
      // this.detay.resim = this.firmaInfo.resim;
      // this.detay.firma = this.firmaInfo.firma;
      this.ilanSer.createIlan(this.detay)
        .then((res) =>{
      this.navCtrl.setRoot(IlanlarimPage);

        })
        .catch((err) => {
              return;
        });
    }
    // this.detayList.push(this.detay);
    // this.des = this.des.replace('Ekle', '');
    else{
    console.log(this.detay+'ilan yeni ekleniyor');
    this.ilanSer.updateIlan(this.detay)
      .then((res) =>{
        this.navCtrl.setRoot(IlanlarimPage);
        // this.storage.set('ozgecmis', this.basvurulist)
      // this.orgDetay = this.detay;
      // console.log(JSON.stringify(this.orgDetay)+'orgDetay');
      // this.events.publish('ilan:ekle');
    })
    .catch((err) => {
          return;
    });
    }
      // this.navCtrl.setRoot(IlanlarimPage);
  }

}
