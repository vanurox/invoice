import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { InvoicePage } from '../pages/invoice/invoice';
import { CreateinvoicePage } from '../pages/createinvoice/createinvoice';
import { LogoutPage } from '../pages/logout/logout';
import { RegisterPage } from '../pages/register/register';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CookieService } from 'ngx-cookie-service';
import { SignaturePage } from '../pages/signature/signature';
import { W9formPage } from '../pages/w9form/w9form';
import { HistoryPage } from '../pages/history/history';
import { DownloadbillsPage } from '../pages/downloadbills/downloadbills';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AuthserviceProvider } from '../providers/authservice/authservice';
import { InvoiceviewPage } from '../pages/invoiceview/invoiceview';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    InvoicePage,
    CreateinvoicePage,
    LogoutPage,
    RegisterPage,
    W9formPage,
    HistoryPage,
    InvoiceviewPage,
    DownloadbillsPage,
    SignaturePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SignaturePadModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    InvoicePage,
    CreateinvoicePage,
    LogoutPage,
    W9formPage,
    HistoryPage,
    InvoiceviewPage,
    DownloadbillsPage,
    SignaturePage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CookieService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthserviceProvider,
    ImagePicker,
	Crop,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    Transfer,
    FilePath,
  ]
})
export class AppModule {}
