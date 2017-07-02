import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TumOzgecmislerPage } from './tum-ozgecmisler';

@NgModule({
  declarations: [
    TumOzgecmislerPage,
  ],
  imports: [
    IonicPageModule.forChild(TumOzgecmislerPage),
  ],
  exports: [
    TumOzgecmislerPage
  ]
})
export class TumOzgecmislerPageModule {}
