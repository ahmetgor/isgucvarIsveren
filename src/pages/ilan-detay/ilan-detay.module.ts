import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IlanDetayPage } from './ilan-detay';

@NgModule({
  declarations: [
    IlanDetayPage,
  ],
  imports: [
    IonicPageModule.forChild(IlanDetayPage),
  ],
  exports: [
    IlanDetayPage
  ]
})
export class IlanDetayPageModule {}
