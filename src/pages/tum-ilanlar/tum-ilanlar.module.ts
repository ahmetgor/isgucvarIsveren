import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TumIlanlarPage } from './tum-ilanlar';

@NgModule({
  declarations: [
    TumIlanlarPage,
  ],
  imports: [
    IonicPageModule.forChild(TumIlanlarPage),
  ],
  exports: [
    TumIlanlarPage
  ]
})
export class TumIlanlarPageModule {}
