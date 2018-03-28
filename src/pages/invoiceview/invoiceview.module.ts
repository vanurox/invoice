import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceviewPage } from './invoiceview';

@NgModule({
  declarations: [
    InvoiceviewPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceviewPage),
  ],
})
export class InvoiceviewPageModule {}
