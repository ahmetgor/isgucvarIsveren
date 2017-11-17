import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import {ToastController, LoadingController, Events } from 'ionic-angular';


@Injectable()
export class UserSerProvider {
  token: any = {};
  user: any = {};
  // url : string = window.location.origin+'/api/firmaauth/';
  // url1 : string = window.location.origin+'/api/tools/';
  url : string = 'https://isgucvarisveren.herokuapp.com/api/firmaauth/';
  url1: string = 'https://isgucvarisveren.herokuapp.com/api/tools/';
  // url : string = 'http://127.0.0.1:8080/api/firmaauth/';
  // url1: string = 'http://127.0.0.1:8080/api/tools/';
  currentUser: any;
  loading: any;

  constructor(public http: Http, public storage: Storage,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController,
              public events: Events) {
    console.log('Hello UserSerProvider Provider');
    // this.checkAuthentication();
  }

  checkAuthentication(){

    return new Promise((resolve, reject) => {
        this.storage.get('token').then((value) => {
            // console.log(value+' token');
            this.token = value;

        this.storage.get('user')
            .then((user) => {this.currentUser = user;
              this.events.publish('login:event');
            })
            .catch((err) => {
              console.log("hata");
            });

            let headers = new Headers();
            headers.append('Authorization', this.token);
            this.http.get(this.url+'protected', {headers: headers})
                .subscribe(res => {
                  console.log(JSON.stringify(res)+"success");
                    resolve(res);
                }, (err) => {
                  console.log(JSON.stringify(err)+"err");
                    reject(err);
                });
        });
    });
  }

  createFirmaAccount(details){

    return new Promise((resolve, reject) => {
      this.showLoader();

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url+'register/firma', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            // this.currentUser = details;
            let data = res.json();
            // this.token = data.token;
            // this.storage.set('token', data.token);
            // this.storage.set('user', details);
            this.loading.dismiss();
            this.presentToast("Firma hesabı oluşturuldu!");
            resolve(data);

          }, (err) => {
            this.loading.dismiss();
            let erm = JSON.parse(err._body);
            this.presentToast("Firma hesabı oluşturulamadı! "+erm.error);
            reject(err);
          });
    });
  }

  createAccount(details){

    return new Promise((resolve, reject) => {
      this.showLoader();
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        console.log("createaccount");
        this.http.post(this.url+'register/user', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            this.loading.dismiss();
            this.presentToast("Çalışan hesabı oluşturuldu!");
            resolve(data);

          }, (err) => {
            // console.log(err+"hebe");
            // console.log(JSON.parse(err)+"adsasdad");
            if(err._body) {
              this.loading.dismiss();
            this.presentToast("Çalışan hesabı oluşturulamadı! Firma bilgileri hatalı!");
            }
            else {
              this.loading.dismiss();
            let erm = JSON.parse(err._body);
            this.presentToast("Çalışan hesabı oluşturulamadı! "+erm.error);
            reject(err);
          }
          });
    });
  }

  login(credentials){

    return new Promise((resolve, reject) => {
      this.showLoader();
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
            this.events.publish('login:event');

            this.loading.dismiss();

            resolve(data);
            // resolve(res.json());
          }, (err) => {
            this.loading.dismiss();
            this.presentToast('Bilgileriniz hatalı veya hesabınız aktif değil!');
            console.log(JSON.stringify(err)+'servis err');
            reject(err);
          });
    });
  }

  updateUser(user: any){
    this.showLoader();
    return new Promise((resolve, reject) => {
      let en = user.en ? user.en : "";
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.token);
      console.log(JSON.stringify(user)+'order service update user');

      this.http.put(this.url + 'updateuser'+en, JSON.stringify(user), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          // this.ozgecmis = kayit;
          // this.storage.set('ozgecmis', kayit);
          console.log(JSON.stringify(res)+"updateuser");
          this.loading.dismiss();
          this.presentToast('Kullanıcı güncellendi!');
          resolve(res);
        }, (err) => {
          // reject(err);
          this.loading.dismiss();
          console.log(JSON.stringify(err));
          this.presentToast('Kullanıcı güncellenemedi. Bağlantı problemi veya şifre hatalı olabilir!');
        });
    });
  }

  updateFirma(user){
    this.showLoader();
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(user)+'order service update firma');

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.token);

      this.http.put(this.url + 'updatefirma', JSON.stringify(user), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {

          console.log(JSON.stringify(res)+"updatefirma");
          this.loading.dismiss();
          this.presentToast('Firma güncellendi. Tekrar giriş yaptığınızda geçerli olacak.');
          resolve(res);
        }, (err) => {
          // reject(err);
          console.log(JSON.stringify(err));
          this.loading.dismiss();
          if(JSON.stringify(err).includes('duplicate'))
          this.presentToast('Firma ismi kullanılıyor. Firma güncellenemedi.');
          else
          this.presentToast('Firma güncellenemedi. Bağlantı problemi veya şifre hatalı olabilir!');
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
