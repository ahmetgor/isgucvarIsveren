import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserSerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserSerProvider {
  token: any = {};
  user: any = {};
  url : string = 'https://serverisgucvar.herokuapp.com/api/auth/';
  url1 : string = 'https://serverisgucvar.herokuapp.com/api/tools/';

  // url : string = 'http://127.0.0.1:8080/api/auth/';
  // url1: string = 'http://127.0.0.1:8080/api/tools/';
  currentUser: any;
  loading: any;

  constructor(public http: Http) {
    console.log('Hello UserSerProvider Provider');
  }

}
