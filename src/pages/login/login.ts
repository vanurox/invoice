import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Header, LoadingController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { InvoicePage } from '../invoice/invoice';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl, NgForm} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  submitAttempt: boolean;
  password: AbstractControl;
  username: AbstractControl;
  
  cookieValue: string;
  formgroup:FormGroup;
 constructor(private http : HttpClient,
  public cookieService:CookieService,
  public formbuilder:FormBuilder,
  public navCtrl: NavController,
  private loadingCtrl: LoadingController,
  private alertCtrl: AlertController,
  public storage:Storage
){  
  this.formgroup= formbuilder.group({
                    username:['',[Validators.required,Validators.email]],
                    password:['',Validators.required],
      });
      
      this.username = this.formgroup.controls['username'];
      this.password = this.formgroup.controls['password'];
      if(localStorage.getItem('token')){
        this.navCtrl.setRoot(InvoicePage);
      }
      
 } 
  onGoToRegiter(name:string) { 
    	  this.navCtrl.push(RegisterPage, {userName: name});
      }
  getMeIn(form:NgForm){
    const loading = this.loadingCtrl.create({
      content:"Signing you up...."
    });
      loading.present();
         var apiurl="http://oscuz.com/user-manage/APIs/index.php/auth/login";
         var headers = new HttpHeaders();
        // console.log(form.value.username);
         let user= JSON.stringify({ 
                         "username": form.value.username,
                         "password": form.value.password
                       });
         headers.append('Content-Type','application/x-www-form-urlencoded');
         this.http.post(apiurl,user,{headers:headers}).subscribe(data=>{    
          if(data){
            // console.log(data);
             if(data['status']==200 && data['statuscode']){
              loading.dismiss();
              // this.storage.set('token', data['token']);  
              // this.storage.set('userdata', data['userdata']); 
              localStorage.setItem('token',data['token']);
              localStorage.setItem('userdata',JSON.stringify(data['userdata'])); 
              
              this.navCtrl.setRoot(InvoicePage);
             }else{
              loading.dismiss(); 
              const alert = this.alertCtrl.create({
                title:'Signin Failed',
                message:'Wrong Credentials.',
                buttons:['Ok']
              }); 
             alert.present(); 
             }
          }
       });
  }   
}