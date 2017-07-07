import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OzgecmisSerProvider } from '../../providers/ozgecmis-ser';
import { FormControl } from '@angular/forms';

/**
 * Generated class for the OzgecmislerimPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ozgecmislerim',
  templateUrl: 'ozgecmislerim.html',
})
export class OzgecmislerimPage {

  ozgecmisList: any;
  searching: boolean = false;
  searchTerm: string = '';
  searchControl: FormControl;
  skip: number = 0;
  limit: number = 20;
  scrollEnable: boolean = true;
  detayAra: any = {};
  sirala: any = '{}';


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ozgecmisSer: OzgecmisSerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OzgecmislerimPage');
    this.searching = true;
    this.ozgecmisSer.getOzgecmisler(this.searchTerm, this.detayAra, this.sirala, this.skip, this.limit)
    .then(ilanlar => {
      this.ozgecmisList = ilanlar;
      console.log(JSON.stringify(this.ozgecmisSer));
      this.searching = false;
    });
  }

  getAge(date) {
    return ~~(((new Date()).getTime() - (new Date(date)).getTime()) / (31557600000));
  }
}
