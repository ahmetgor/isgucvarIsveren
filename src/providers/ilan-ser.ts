import { Injectable } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { UserSerProvider } from './user-ser';

/*
  Generated class for the IlanSerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IlanSerProvider {

  // url : string = 'https://serverisgucvar.herokuapp.com/api/ilanlar/';
  url : string = 'http://127.0.0.1:8080/api/ilanlar/';
  // ilanlar: Array<any>;
  basvurKaydetList: any;
  loading: any;
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

  constructor(public http: Http, public authService: UserSerProvider,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    console.log('Hello IlanSerProvider Provider');
  }

  getIlanlar(searchTerm, searchKayit, orderBy, skip, limit){
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      let order = JSON.parse(orderBy);
      console.log(JSON.stringify(order)+'order service');
      console.log(order+'order service string');

      return new Promise((resolve, reject) => {
      this.http.get(this.url + `?term=${searchTerm}&kayit=${JSON.stringify(searchKayit)}&orderBy=${JSON.stringify(order)}&skip=${skip}&limit=${limit}`
      , {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          console.log(JSON.stringify(data));
          resolve(data);
        }, (err) => {
          // reject(err);
          this.presentToast();
        });
    });
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'İlan listesi alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!',
    duration: 4000,
    position: 'top',
    showCloseButton: true,
    closeButtonText: 'OK'
  });
  toast.onDidDismiss(() => {
    // console.log('Dismissed toast');
  });
  toast.present();
}

}
