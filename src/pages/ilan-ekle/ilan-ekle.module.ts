import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IlanEklePage } from './ilan-ekle';

@NgModule({
  declarations: [
    IlanEklePage,
  ],
  imports: [
    IonicPageModule.forChild(IlanEklePage),
  ],
  exports: [
    IlanEklePage
  ]
})
export class IlanEklePageModule {}
