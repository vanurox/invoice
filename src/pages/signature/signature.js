var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
var SignaturePage = /** @class */ (function () {
    function SignaturePage(http, navCtrl, navParams, loadingCtrl, storage) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.signaturePadOptions = {
            'minWidth': 5,
            'canvasWidth': 340,
            'canvasHeight': 200
        };
        this.userdata = JSON.parse(localStorage.getItem('userdata'));
        // console.log(this.userdata);
        // console.log(this.userdata.id);
    }
    SignaturePage.prototype.ngAfterViewInit = function () {
        // this.signaturePad is now available
        this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
        this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    };
    SignaturePage.prototype.drawComplete = function () {
        var _this = this;
        // will be notified of szimek/signature_pad's onEnd event
        //  console.log(this.signaturePad.toDataURL());
        this.imagedata = this.signaturePad.toDataURL();
        var loading = this.loadingCtrl.create({
            content: "Saving Signature...."
        });
        loading.present();
        var apiurl = "http://oscuz.com/user-manage/APIs/index.php/auth/savesign";
        var headers = new HttpHeaders();
        /* getting current userid from local stroage and pass it to api */
        var data = JSON.stringify({ "uid": this.userdata.id, "imagedata": this.imagedata });
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(apiurl, data, { headers: headers }).subscribe(function (data) {
            if (data) {
                if (data['status'] == 200 && data['statuscode']) {
                    loading.dismiss();
                }
                else {
                    loading.dismiss();
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Saving Failed',
                        message: 'Wrong Values.',
                        buttons: ['Ok']
                    });
                    alert_1.present();
                }
            }
        });
    };
    SignaturePage.prototype.drawStart = function () {
        //  console.log(this.storage.get('token'));
        // console.log('begin drawing');
    };
    SignaturePage.prototype.drawClear = function () {
        this.signaturePad.clear();
    };
    SignaturePage.prototype.drawCancel = function () {
        this.navCtrl.setRoot(HomePage);
    };
    __decorate([
        ViewChild(SignaturePad),
        __metadata("design:type", SignaturePad)
    ], SignaturePage.prototype, "signaturePad", void 0);
    SignaturePage = __decorate([
        Component({
            selector: 'page-signature',
            templateUrl: 'signature.html',
        }),
        __metadata("design:paramtypes", [HttpClient,
            NavController,
            NavParams,
            LoadingController,
            Storage])
    ], SignaturePage);
    return SignaturePage;
}());
export { SignaturePage };
//# sourceMappingURL=signature.js.map