import { Injectable } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { UserSerProvider } from './user-ser';
import { Storage } from '@ionic/storage';

/*
  Generated class for the IlanSerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IlanSerProvider {

  url : string = 'https://serverisgucvar.herokuapp.com/api/ilanlar/';
  // url : string = 'http://127.0.0.1:8080/api/ilanlar/';
  // ilanlar: Array<any>;
  // basvurKaydetList: any;
  loading: any;
  // ozgecmisId: string;
  user: any;
  // ozgecmis: any;
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
              public toastCtrl: ToastController, public loadingCtrl: LoadingController,
              public storage: Storage) {
    console.log('Hello IlanSerProvider Provider');
  }

  getIlanlar(searchTerm, searchKayit, orderBy, skip, limit){
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      let order = JSON.parse(orderBy);
      console.log(JSON.stringify(order)+'order service');
      console.log(order+'order service string');

      return new Promise((resolve, reject) => {
        let uri = encodeURI(this.url + `?term=${searchTerm}&kayit=${JSON.stringify(searchKayit)}&orderBy=${JSON.stringify(order)}&skip=${skip}&limit=${limit}`)
      this.http.get(uri
      , {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          console.log(JSON.stringify(data));
          resolve(data);
        }, (err) => {
          // reject(err);
          this.presentToast('İlanlar alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
  }

  updateIlan(kayit: any){
    this.showLoader();
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      console.log(JSON.stringify(kayit)+'order service add ilan');

      this.http.put(this.url + kayit._id, JSON.stringify(kayit), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          // this.ozgecmis = kayit;
          // this.storage.set('ozgecmis', kayit);
          console.log(JSON.stringify(res)+"updateall");
          this.loading.dismiss();
          this.presentToast('İlan güncellendi!');
          resolve(res);
        }, (err) => {
          // reject(err);
          this.loading.dismiss();
          this.presentToast('İlan güncellenemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
  }

  getIlan(ilanId: string){
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      return new Promise((resolve, reject) => {
      this.http.get(this.url + ilanId, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // this.ozgecmis = data;
          // this.storage.set('ozgecmis', data);
          // console.log(JSON.stringify(data)+"data123");
          resolve(data);
        }, (err) => {
          // reject(err);
          this.presentToast('İlan alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
}

createIlan(ilan: any){
  this.showLoader();

  return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(this.url, JSON.stringify(ilan), {headers: headers})
      .map(res => res.json())
        .subscribe(data => {
          // this.currentUser = details;
          this.loading.dismiss();
          this.presentToast('İlan eklendi!');
          resolve(data);

        }, (err) => {
          this.loading.dismiss();
          this.presentToast('İlan eklenemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
          reject(err);
        });
  });
}
  presentToast(message) {
  let toast = this.toastCtrl.create({
    message: message,
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

getUsers(id: string){
  let headers = new Headers();
  headers.append('Authorization', this.authService.token);
  return new Promise((resolve, reject) => {
  this.http.get(this.url + 'getusers/' + id, {headers: headers})
    .map(res => res.json())
    .subscribe(data => {

      console.log(JSON.stringify(data)+"data123");
      resolve(data);
    }, (err) => {
      // reject(err);
      this.presentToast('Kullanıcı listesi alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
    });
});
}

showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'İşlem yapılıyor...'
    });
    this.loading.present();
}

}
