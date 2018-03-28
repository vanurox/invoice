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
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
var DownloadbillsPage = /** @class */ (function () {
    function DownloadbillsPage(http, navCtrl, actionSheetCtrl, imagePicker, loadingCtrl, camera, cropService) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.imagePicker = imagePicker;
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.cropService = cropService;
        this.userdata = JSON.parse(localStorage.getItem('userdata'));
    }
    DownloadbillsPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose or take a picture',
            buttons: [
                {
                    text: 'Take a picture',
                    handler: function () {
                        _this.takePicture();
                    }
                },
                {
                    text: 'Choose pictures',
                    handler: function () {
                        _this.openImagePicker();
                    }
                }
            ]
        });
        actionSheet.present();
    };
    DownloadbillsPage.prototype.openImagePicker = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 5,
        };
        this.photos = new Array();
        this.imagePicker.getPictures(options)
            .then(function (results) {
            _this.reduceImages(results).then(function () {
                console.log('all images cropped!!');
            });
        }, function (err) { console.log(err); });
    };
    DownloadbillsPage.prototype.reduceImages = function (selected_pictures) {
        var _this = this;
        return selected_pictures.reduce(function (promise, item) {
            return promise.then(function (result) {
                return _this.cropService.crop(item, { quality: 75 }).then(function (cropped_image) { return _this.photos.push(cropped_image); });
            });
        }, Promise.resolve());
    };
    DownloadbillsPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 65,
            correctOrientation: true
        };
        this.camera.getPicture(options)
            .then(function (data) {
            _this.photos = new Array();
            _this.cropService
                .crop(data, { quality: 75 })
                .then(function (newImage) {
                var loading = _this.loadingCtrl.create({
                    content: "Saving Image...."
                });
                loading.present();
                _this.photos.push(newImage);
                _this.base64data = 'data:image/jpeg;base64,' + newImage;
                var apiurl = "http://oscuz.com/user-manage/APIs/index.php/invoice/savebill";
                var headers = new HttpHeaders();
                /* getting current userid from local stroage and pass it to api */
                var data = JSON.stringify({ "uid": _this.userdata.id, "imagedata": _this.base64data });
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
                _this.http.post(apiurl, data, { headers: headers }).subscribe(function (data) {
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
            }, function (error) { return console.error("Error cropping image", error); });
        }, function (error) {
            console.log(error);
        });
    };
    DownloadbillsPage.prototype.deletePicture = function (index) {
    };
    DownloadbillsPage = __decorate([
        Component({
            selector: 'page-downloadbills',
            templateUrl: 'downloadbills.html',
        }),
        __metadata("design:paramtypes", [Object, NavController,
            ActionSheetController, Object, LoadingController,
            Camera,
            Crop])
    ], DownloadbillsPage);
    return DownloadbillsPage;
}());
export { DownloadbillsPage };
//# sourceMappingURL=downloadbills.js.map