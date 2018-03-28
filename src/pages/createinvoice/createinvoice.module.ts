import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateinvoicePage } from './createinvoice';

@NgModule({
  declarations: [
    CreateinvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateinvoicePage),
  ],
})
export class CreateinvoicePageModule {}
