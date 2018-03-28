import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
 
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {
  alertCtrl: any;
 
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  imagedata:any; 
  userdata:any;
  constructor(
    private http : HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public storage:Storage
    ){ 
      this.userdata=JSON.parse(localStorage.getItem('userdata'));
      // console.log(this.userdata);
      // console.log(this.userdata.id);
    } 
   private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
     'minWidth': 5,
     'canvasWidth': 340,
     'canvasHeight': 200
   };
     
   ngAfterViewInit() {
     // this.signaturePad is now available
     this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
     this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
   }
  
   drawComplete() {
    
     // will be notified of szimek/signature_pad's onEnd event
    //  console.log(this.signaturePad.toDataURL());
     this.imagedata=this.signaturePad.toDataURL();
     const loading = this.loadingCtrl.create({
        content:"Saving Signature...."
      });
      loading.present();
      var apiurl="http://oscuz.com/user-manage/APIs/index.php/auth/savesign";
      var headers = new HttpHeaders();
      /* getting current userid from local stroage and pass it to api */
      
      let data= JSON.stringify({ "uid":this.userdata.id, "imagedata": this.imagedata  });
      headers.append('Content-Type','application/x-www-form-urlencoded');
      this.http.post(apiurl,data,{headers:headers}).subscribe(data=>{    
          if(data){
              if(data['status']==200 && data['statuscode']){
                loading.dismiss();
              
              }else{
              loading.dismiss(); 
              const alert = this.alertCtrl.create({
                title:'Saving Failed',
                message:'Wrong Values.',
                buttons:['Ok']
              }); 
              alert.present(); 
              }
          }
      });
   }
  
   drawStart() {
    //  console.log(this.storage.get('token'));
    // console.log('begin drawing');
   }

   drawClear(){
     this.signaturePad.clear();
   }
   drawCancel(){
    this.navCtrl.setRoot(HomePage);
   }
}
