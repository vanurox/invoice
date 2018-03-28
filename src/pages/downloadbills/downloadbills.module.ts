import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DownloadbillsPage } from './downloadbills';

@NgModule({
  declarations: [
    DownloadbillsPage,
  ],
  imports: [
    IonicPageModule.forChild(DownloadbillsPage),
  ],
})
export class DownloadbillsPageModule {}
