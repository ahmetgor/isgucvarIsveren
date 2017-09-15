import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirmaHesapPage } from './firma-hesap';

@NgModule({
  declarations: [
    FirmaHesapPage,
  ],
  imports: [
    IonicPageModule.forChild(FirmaHesapPage),
  ],
  exports: [
    FirmaHesapPage
  ]
})
export class FirmaHesapPageModule {}
