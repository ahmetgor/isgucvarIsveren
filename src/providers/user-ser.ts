import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import {ToastController, LoadingController } from 'ionic-angular';


@Injectable()
export class UserSerProvider {
  token: any = {};
  user: any = {};
  // url : string = 'https://serverisgucvar.herokuapp.com/api/firmaauth/';
  // url1 : string = 'https://serverisgucvar.herokuapp.com/api/tools/';

  url : string = 'http://127.0.0.1:8080/api/firmaauth/';
  url1: string = 'http://127.0.0.1:8080/api/tools/';
  currentUser: any;
  loading: any;

  constructor(public http: Http, public storage: Storage,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    console.log('Hello UserSerProvider Provider');
  }

  checkAuthentication(){

    return new Promise((resolve, reject) => {
        this.storage.get('token').then((value) => {
            // console.log(value+' token');
            this.token = value;

        this.storage.get('user')
            .then((user) => this.currentUser = user);

            let headers = new Headers();
            headers.append('Authorization', this.token);
            this.http.get(this.url+'protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    });
  }

  createAccount(details){

    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url+'register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            // this.currentUser = details;
            let data = res.json();
            // this.token = data.token;
            // this.storage.set('token', data.token);
            // this.storage.set('user', details);
            resolve(data);

          }, (err) => {
            // console.log(JSON.stringify(err)+'registererr')
            reject(err);
          });
    });
  }

  login(credentials){

    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url+'login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {

            let data = res.json();
            this.token = data.token;
            // console.log(data+'data');
            console.log(JSON.stringify(data)+'user');
            this.currentUser = data.user;
            this.storage.set('token', data.token);
            this.storage.set('user', data.user);

            resolve(data);
            // resolve(res.json());
          }, (err) => {
            console.log(JSON.stringify(err)+'servis err');
            reject(err);
          });
    });
  }

  forgot(user){
    this.showLoader();
    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url1+'forgot', JSON.stringify(user), {headers: headers})
          .subscribe(res => {
            resolve(res);
            // resolve(res.json());
            this.loading.dismiss();
            this.presentToast('Şifreniz resetlendi. Emailinize 1 saat geçerli geçici şifre gönderildi');

          }, (err) => {
            let erm = JSON.parse(err._body);
            console.log(erm.error+'forgot err')
            this.loading.dismiss();
            this.presentToast("Geçici şifre gönderilemedi. "+erm.error);
          });
    });
  }

  reset(user){
    this.showLoader();
    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url1+'reset', JSON.stringify(user), {headers: headers})
          .subscribe(res => {
            this.loading.dismiss();
            resolve(res);
            // resolve(res.json());
            this.presentToast('Şifreniz değiştirildi.');

          }, (err) => {
            let erm = JSON.parse(err._body);
            console.log(erm.error+'forgot err')
            this.loading.dismiss();
            this.presentToast("Yeni şifre kaydedilemedi. "+erm.error);
          });
    });
  }

  logout(){
      this.storage.remove('token');
      this.storage.remove('user');
      this.currentUser = undefined;
      this.token = '';
  }

  presentToast(mesaj) {
  let toast = this.toastCtrl.create({
    message: mesaj,
    duration: 5000,
    position: 'top',
    showCloseButton: true,
    closeButtonText: 'OK'
  });
  toast.onDidDismiss(() => {
    // console.log('Dismissed toast');
  });
  toast.present();
  }

  showLoader(){

      this.loading = this.loadingCtrl.create({
          content: 'İşlem yapılıyor...'
      });
      this.loading.present();
  }
}
