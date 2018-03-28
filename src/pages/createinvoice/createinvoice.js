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
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from "@angular/forms";
import { InvoicePage } from '../invoice/invoice';
var CreateinvoicePage = /** @class */ (function () {
    function CreateinvoicePage(http, navCtrl, navParams, loadingCtrl, alertCtrl, formbuilder) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.formbuilder = formbuilder;
        this.formgroup = formbuilder.group({
            compName: ['', Validators.required],
            mailingAddress: ['', Validators.required],
            invoiceDate: ['', Validators.required],
            pickUp: ['', Validators.required],
            dropLocation: ['', Validators.required],
            lineHaul: ['', [Validators.required]],
            lineItem: ['', Validators.required],
            totalAmount: ['', Validators.required],
            notes: ['', Validators.required]
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
        this.userdata = JSON.parse(localStorage.getItem('userdata'));
    }
    CreateinvoicePage.prototype.onSubmit = function (form) {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        // console.log(data.uemail);
                        var user = JSON.stringify({
                            "uid": _this.userdata.id,
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
                        var loading = _this.loadingCtrl.create({
                            content: "In process...."
                        });
                        var headers = new HttpHeaders();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded');
                        /* api hit for sending invoice as email start here */
                        var apiurlsendemail = "http://oscuz.com/user-manage/APIs/index.php/invoice/sendinvoiceasemail";
                        _this.http.post(apiurlsendemail, user, { headers: headers }).subscribe(function (data) {
                            if (data) {
                                console.log(data);
                            }
                        });
                        /* api hit for sending invoice as email ends here */
                        /* api hit for creating invoice start here */
                        var apiurl = "http://oscuz.com/user-manage/APIs/index.php/invoice/create";
                        _this.http.post(apiurl, user, { headers: headers }).subscribe(function (data) {
                            if (data) {
                                console.log(data);
                                if (data['status'] == 200) {
                                    loading.dismiss();
                                    var alert_1 = _this.alertCtrl.create({
                                        title: '',
                                        message: 'Created successfully',
                                        buttons: ['Ok']
                                    });
                                    alert_1.present();
                                    _this.navCtrl.push(InvoicePage);
                                }
                                else {
                                    loading.dismiss();
                                    var alert_2 = _this.alertCtrl.create({
                                        title: 'Invoice creation fail',
                                        buttons: ['Ok']
                                    });
                                    alert_2.present();
                                }
                            }
                        });
                        /* api hit for creating invoice end here */
                    }
                }
            ]
        });
        prompt.present();
    };
    CreateinvoicePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateinvoicePage');
    };
    CreateinvoicePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-createinvoice',
            templateUrl: 'createinvoice.html',
        }),
        __metadata("design:paramtypes", [HttpClient,
            NavController,
            NavParams,
            LoadingController,
            AlertController,
            FormBuilder])
    ], CreateinvoicePage);
    return CreateinvoicePage;
}());
export { CreateinvoicePage };
//# sourceMappingURL=createinvoice.js.map