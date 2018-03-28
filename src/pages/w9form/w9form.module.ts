import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { W9formPage } from './w9form';

@NgModule({
  declarations: [
    W9formPage,
  ],
  imports: [
    IonicPageModule.forChild(W9formPage),
  ],
})
export class W9formPageModule {}
