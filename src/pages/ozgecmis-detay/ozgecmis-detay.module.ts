import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OzgecmisDetayPage } from './ozgecmis-detay';

@NgModule({
  declarations: [
    OzgecmisDetayPage,
  ],
  imports: [
    IonicPageModule.forChild(OzgecmisDetayPage),
  ],
  exports: [
    OzgecmisDetayPage
  ]
})
export class OzgecmisDetayPageModule {}
