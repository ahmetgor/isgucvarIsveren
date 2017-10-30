import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OzgecmisDetayPage } from './ozgecmis-detay';
import { DatePipeModule } from '../../pipes/date-pipe.module';

@NgModule({
  declarations: [
    OzgecmisDetayPage,
  ],
  imports: [
    IonicPageModule.forChild(OzgecmisDetayPage),
    DatePipeModule
  ],
  exports: [
    OzgecmisDetayPage
  ]
})
export class OzgecmisDetayPageModule {}
