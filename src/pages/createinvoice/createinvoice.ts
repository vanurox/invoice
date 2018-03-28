import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { FormControl } from '@angular/forms';
import { InvoicePage } from '../invoice/invoice';
@IonicPage()
@Component({
  selector: 'page-createinvoice',
  templateUrl: 'createinvoice.html',
})
export class CreateinvoicePage {
  userdata:any;
  mailingAddress: AbstractControl;
  compName: AbstractControl;
  invoiceDate: AbstractControl;
  pickUp: AbstractControl;
  dropLocation: AbstractControl;
  lineHaul: AbstractControl;
  lineItem: AbstractControl;
  totalAmount: AbstractControl;
  notes: AbstractControl;
  formgroup:FormGroup; 
  constructor(
    private http : HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public formbuilder:FormBuilder,
    ){
        this.formgroup= formbuilder.group({
          compName:['',Validators.required],
          mailingAddress:['',Validators.required],
          invoiceDate:['',Validators.required],
          pickUp:['',Validators.required],
          dropLocation:['',Validators.required],
          lineHaul:['',[Validators.required]],
          lineItem:['',Validators.required],
          totalAmount:['',Validators.required],
          notes:['',Validators.required]
        });

        this.compName = this.formgroup.controls['compName'];
        this.mailingAddress = this.formgroup.controls['mailingAddress'];
        this.invoiceDate = this.formgroup.controls['invoiceDate'];
        this.pickUp = this.formgroup.controls['pickUp'];
        this.dropLocation = this.formgroup.controls['dropLocation'];
        this.lineHaul = this.formgroup.controls['lineHaul']; 
        this.lineItem = this.formgroup.controls['lineItem']; 
        this.totalAmount = this.formgroup.controls['totalAmount']; 
        this.notes = this.formgroup.controls['notes']; 

        this.userdata=JSON.parse(localStorage.getItem('userdata'));
    }

    onSubmit(form:NgForm){
      
      let prompt = this.alertCtrl.create({
        title: 'Enter Email',
        message: 'where you want to send this Invoice copy.',
        inputs: [
          {
            name: 'uemail',
            placeholder: 'Email'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              // console.log(data.uemail);
            
              let user= JSON.stringify({ 
                              "uid":this.userdata.id,
                              "company_name": form.value.compName,
                              "invoice_date": form.value.invoiceDate,
                              "address": form.value.mailingAddress,
                              "pick_up": form.value.pickUp,
                              "drop_location": form.value.dropLocation,
                              "amount": form.value.lineHaul,
                              "line_item": form.value.lineItem,
                              "total_amount": form.value.totalAmount,
                              "notes": form.value.notes,
                              "useremail": data.uemail
                            });
             
              const loading = this.loadingCtrl.create({
                content:"In process...."
              });
           
              
              var headers = new HttpHeaders();
              headers.append('Content-Type', 'application/x-www-form-urlencoded');

              /* api hit for sending invoice as email start here */
                var apiurlsendemail="http://oscuz.com/user-manage/APIs/index.php/invoice/sendinvoiceasemail";
                this.http.post(apiurlsendemail,user,{headers:headers}).subscribe(data=>{ 
                  if(data){ console.log(data); }
                });
              /* api hit for sending invoice as email ends here */               
              /* api hit for creating invoice start here */   
              var apiurl="http://oscuz.com/user-manage/APIs/index.php/invoice/create";            
              this.http.post(apiurl,user,{headers:headers}).subscribe(data=>{ 
                if(data){ console.log(data);
                  if(data['status']==200){
                   loading.dismiss();
                   const alert = this.alertCtrl.create({
                    title:'',
                    message:'Created successfully',
                    buttons:['Ok']
                  }); 
                 alert.present();
                 this.navCtrl.push(InvoicePage);
                  }else{
                   loading.dismiss(); 
                   const alert = this.alertCtrl.create({
                     title:'Invoice creation fail',
                     buttons:['Ok']
                   }); 
                  alert.present();
                  }
               }
              });
              /* api hit for creating invoice end here */  
            }
          }
        ]
      });
      prompt.present();
      
        
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateinvoicePage');
  }

}
