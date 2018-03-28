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
import { LoginPage } from '../login/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(http, cookieService, formbuilder, navCtrl, loadingCtrl, alertCtrl, storage) {
        this.http = http;
        this.cookieService = cookieService;
        this.formbuilder = formbuilder;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.loginpage = LoginPage;
        this.formgroup = formbuilder.group({
            compName: ['', Validators.required],
            ownName: ['', Validators.required],
            mialingAddress: ['', Validators.required],
            mcNumber: ['', Validators.required],
            mobNumber: ['', Validators.required],
            uEmail: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        this.compName = this.formgroup.controls['compName'];
        this.ownName = this.formgroup.controls['ownName'];
        this.mialingAddress = this.formgroup.controls['mialingAddress'];
        this.mcNumber = this.formgroup.controls['mcNumber'];
        this.mobNumber = this.formgroup.controls['mobNumber'];
        this.uEmail = this.formgroup.controls['uEmail'];
        this.password = this.formgroup.controls['password'];
    }
    RegisterPage.prototype.onSignup = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Register in process...."
        });
        var apiurl = "http://oscuz.com/user-manage/APIs/index.php/auth/register";
        var headers = new HttpHeaders();
        // .set('Content-Type','application/x-www-form-urlencoded')
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var user = JSON.stringify({
            "compName": form.value.compName,
            "ownName": form.value.ownName,
            "mialingAddress": form.value.mialingAddress,
            "mcNumber": form.value.mcNumber,
            "mobNumber": form.value.mobNumber,
            "uEmail": form.value.uEmail,
            "password": form.value.password
        });
        this.http.post(apiurl, user, { headers: headers }).subscribe(function (data) {
            if (data) {
                if (data['status'] == 200) {
                    loading.dismiss();
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Registration SuccessFul',
                        message: 'Please Verify your email to login.',
                        buttons: ['Ok']
                    });
                    alert_1.present();
                    _this.navCtrl.push(LoginPage);
                }
                else {
                    loading.dismiss();
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Registration Failed',
                        message: 'Email already exists.',
                        buttons: ['Ok']
                    });
                    alert_2.present();
                }
            }
        });
    };
    RegisterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-register',
            templateUrl: 'register.html',
        }),
        __metadata("design:paramtypes", [HttpClient,
            CookieService,
            FormBuilder,
            NavController,
            LoadingController,
            AlertController,
            Storage])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map