import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IlanFiltrelePage } from './ilan-filtrele';

@NgModule({
  declarations: [
    IlanFiltrelePage,
  ],
  imports: [
    IonicPageModule.forChild(IlanFiltrelePage),
  ],
  exports: [
    IlanFiltrelePage
  ]
})
export class IlanFiltrelePageModule {}
