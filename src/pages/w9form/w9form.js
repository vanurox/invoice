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
/**
 * Generated class for the W9formPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var W9formPage = /** @class */ (function () {
    function W9formPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    W9formPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad W9formPage');
    };
    W9formPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-w9form',
            templateUrl: 'w9form.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], W9formPage);
    return W9formPage;
}());
export { W9formPage };
//# sourceMappingURL=w9form.js.map