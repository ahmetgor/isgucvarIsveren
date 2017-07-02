import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OzgecmislerimPage } from './ozgecmislerim';

@NgModule({
  declarations: [
    OzgecmislerimPage,
  ],
  imports: [
    IonicPageModule.forChild(OzgecmislerimPage),
  ],
  exports: [
    OzgecmislerimPage
  ]
})
export class OzgecmislerimPageModule {}
