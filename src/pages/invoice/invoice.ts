import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { CreateinvoicePage } from '../createinvoice/createinvoice';
import { InvoiceviewPage } from '../invoiceview/invoiceview';
@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {
  userdata:any;
  userinvoices:any;
  createInvoice=CreateinvoicePage;
  invoiceviewPage=InvoiceviewPage;
  constructor(private http : HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    this.userdata=JSON.parse(localStorage.getItem('userdata'));
   
    var apiurl="http://oscuz.com/user-manage/APIs/index.php/invoice";
    var headers = new HttpHeaders();    
    let data= JSON.stringify({ "uid":this.userdata.id });
    headers.append('Content-Type','application/x-www-form-urlencoded');
    this.http.post(apiurl,data,{headers:headers}).subscribe(data=>{    
        if(data){ 
            if(data['status']==200 && data['statuscode']){
              this.userinvoices=data['userinvoices'];  
              console.log(this.userinvoices);  
            }else{
            
            }
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

}
