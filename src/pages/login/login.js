var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { InvoicePage } from '../invoice/invoice';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
var LoginPage = /** @class */ (function () {
    function LoginPage(http, cookieService, formbuilder, navCtrl, loadingCtrl, alertCtrl, storage) {
        this.http = http;
        this.cookieService = cookieService;
        this.formbuilder = formbuilder;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.formgroup = formbuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
        this.username = this.formgroup.controls['username'];
        this.password = this.formgroup.controls['password'];
        if (localStorage.getItem('token')) {
            this.navCtrl.setRoot(InvoicePage);
        }
    }
    LoginPage.prototype.onGoToRegiter = function (name) {
        this.navCtrl.push(RegisterPage, { userName: name });
    };
    LoginPage.prototype.getMeIn = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Signing you up...."
        });
        loading.present();
        var apiurl = "http://oscuz.com/user-manage/APIs/index.php/auth/login";
        var headers = new HttpHeaders();
        // console.log(form.value.username);
        var user = JSON.stringify({
            "username": form.value.username,
            "password": form.value.password
        });
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(apiurl, user, { headers: headers }).subscribe(function (data) {
            if (data) {
                // console.log(data);
                if (data['status'] == 200 && data['statuscode']) {
                    loading.dismiss();
                    // this.storage.set('token', data['token']);  
                    // this.storage.set('userdata', data['userdata']); 
                    localStorage.setItem('token', data['token']);
                    localStorage.setItem('userdata', JSON.stringify(data['userdata']));
                    _this.navCtrl.setRoot(InvoicePage);
                }
                else {
                    loading.dismiss();
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Signin Failed',
                        message: 'Wrong Credentials.',
                        buttons: ['Ok']
                    });
                    alert_1.present();
                }
            }
        });
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [HttpClient,
            CookieService,
            FormBuilder,
            NavController,
            LoadingController,
            AlertController,
            Storage])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map