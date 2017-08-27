import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitorDetailPage } from './exhibitor-detail';

@NgModule({
  declarations: [
    ExhibitorDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExhibitorDetailPage),
  ],
})
export class ExhibitorDetailPageModule {}
