import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IlanlarimPage } from './ilanlarim';

@NgModule({
  declarations: [
    IlanlarimPage,
  ],
  imports: [
    IonicPageModule.forChild(IlanlarimPage),
  ],
  exports: [
    IlanlarimPage
  ]
})
export class IlanlarimPageModule {}
