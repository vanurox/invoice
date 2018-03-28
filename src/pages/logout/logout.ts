import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  userdata:any;
  uid:any;
  token:any;
  constructor(
    private http : HttpClient,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage
    ){
      this.token=localStorage.getItem('token');
      this.userdata=localStorage.getItem('userdata');
      this.doLogOut();
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  doLogOut(){
    
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    
  }

}
