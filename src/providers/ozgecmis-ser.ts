import { Injectable } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserSerProvider } from './user-ser';

/*
  Generated class for the OzgecmisSerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class OzgecmisSerProvider {

  // url : string = 'https://serverisgucvar.herokuapp.com/api/ozgecmis/';
  // url1 : string = 'https://serverisgucvar.herokuapp.com/api/tools/avatar/';
  url : string = 'http://127.0.0.1:8080/api/ozgecmis/';
  url1: string = 'http://127.0.0.1:8080/api/tools/avatar/';
  ozgecmisId: string;
  user: any;
  loading: any;
  ozgecmis: any;

  constructor(public http: Http, public storage: Storage,
              public authService: UserSerProvider,
                public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    console.log('Hello OzgecmisSerProvider Provider');
  }

  getOzgecmis(ozgecmisId: string){
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      return new Promise((resolve, reject) => {
      this.http.get(this.url + ozgecmisId, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.ozgecmis = data;
          this.storage.set('ozgecmis', data);
          console.log(JSON.stringify(data)+"data123");
          resolve(data);
        }, (err) => {
          // reject(err);
          this.presentToast('Özgeçmiş alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
}

  getOzgecmisler(searchTerm, searchKayit, orderBy, skip, limit) {
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
        this.presentToast('Özgeçmiş alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
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
}
