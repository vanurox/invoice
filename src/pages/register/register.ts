import { Component } from '@angular/core';  
import { LoginPage} from '../login/login';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NavController,NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage{
  password: AbstractControl;
  compName: AbstractControl;
  ownName: AbstractControl;
  mialingAddress: AbstractControl;
  mcNumber: AbstractControl;
  mobNumber: AbstractControl;
  uEmail: AbstractControl;
 formgroup:FormGroup; 
   constructor(private http : HttpClient,
    public cookieService:CookieService,
    public formbuilder:FormBuilder,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public storage:Storage){
            this.formgroup= formbuilder.group({
              compName:['',Validators.required],
              ownName:['',Validators.required],
              mialingAddress:['',Validators.required],
              mcNumber:['',Validators.required],
              mobNumber:['',Validators.required],
              uEmail:['',[Validators.required,Validators.email]],
              password:['',Validators.required]
              });

              this.compName = this.formgroup.controls['compName'];
              this.ownName = this.formgroup.controls['ownName'];
              this.mialingAddress = this.formgroup.controls['mialingAddress'];
              this.mcNumber = this.formgroup.controls['mcNumber'];
              this.mobNumber = this.formgroup.controls['mobNumber'];
              this.uEmail = this.formgroup.controls['uEmail'];
              this.password = this.formgroup.controls['password']; 

      }
      
  loginpage=LoginPage;
  onSignup(form:NgForm){
    const loading = this.loadingCtrl.create({
      content:"Register in process...."
    });
    var apiurl="http://oscuz.com/user-manage/APIs/index.php/auth/register";
    var headers = new HttpHeaders();
    // .set('Content-Type','application/x-www-form-urlencoded')
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    let user= JSON.stringify({ 
                    "compName": form.value.compName,
                    "ownName": form.value.ownName,
                    "mialingAddress": form.value.mialingAddress,
                    "mcNumber": form.value.mcNumber,
                    "mobNumber": form.value.mobNumber,
                    "uEmail": form.value.uEmail,
                    "password": form.value.password
                  });
                     
    this.http.post(apiurl,user,{headers:headers}).subscribe(data=>{ 
      if(data){
        if(data['status']==200){
         loading.dismiss();
         const alert = this.alertCtrl.create({
          title:'Registration SuccessFul',
          message:'Please Verify your email to login.',
          buttons:['Ok']
        }); 
       alert.present();
       this.navCtrl.push(LoginPage);
        }else{
         loading.dismiss(); 
         const alert = this.alertCtrl.create({
           title:'Registration Failed',
           message:'Email already exists.',
           buttons:['Ok']
         }); 
        alert.present();
        }
     }
    });
  }
}
