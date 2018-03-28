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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateinvoicePage } from '../createinvoice/createinvoice';
import { InvoiceviewPage } from '../invoiceview/invoiceview';
var InvoicePage = /** @class */ (function () {
    function InvoicePage(http, navCtrl, navParams) {
        var _this = this;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.createInvoice = CreateinvoicePage;
        this.invoiceviewPage = InvoiceviewPage;
        this.userdata = JSON.parse(localStorage.getItem('userdata'));
        var apiurl = "http://oscuz.com/user-manage/APIs/index.php/invoice";
        var headers = new HttpHeaders();
        var data = JSON.stringify({ "uid": this.userdata.id });
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(apiurl, data, { headers: headers }).subscribe(function (data) {
            if (data) {
                if (data['status'] == 200 && data['statuscode']) {
                    _this.userinvoices = data['userinvoices'];
                    console.log(_this.userinvoices);
                }
                else {
                }
            }
        });
    }
    InvoicePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InvoicePage');
    };
    InvoicePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-invoice',
            templateUrl: 'invoice.html',
        }),
        __metadata("design:paramtypes", [HttpClient, NavController, NavParams])
    ], InvoicePage);
    return InvoicePage;
}());
export { InvoicePage };
//# sourceMappingURL=invoice.js.map