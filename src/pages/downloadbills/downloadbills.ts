import { Component } from '@angular/core';
import { NavController, ActionSheetController,LoadingController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-downloadbills',
  templateUrl: 'downloadbills.html',
})
export class DownloadbillsPage {
  userdata:any;
  photos : Array<string>;
  base64data: string;
  alertCtrl: any;

  constructor(
    private http : HttpClient,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    private loadingCtrl: LoadingController,
    public camera: Camera,
    public cropService: Crop
  ) {
    this.userdata=JSON.parse(localStorage.getItem('userdata'));
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Choose pictures',
          handler: () => {
            this.openImagePicker();
          }
        }
      ]
    });
    actionSheet.present();
  }

  openImagePicker(){
    let options = {
      maximumImagesCount: 5,
    }
    this.photos = new Array<string>();
    this.imagePicker.getPictures(options)
    .then((results) => {
      this.reduceImages(results).then(() => {
        console.log('all images cropped!!');
      });
    }, (err) => { console.log(err) });
  }

  reduceImages(selected_pictures: any) : any{
    return selected_pictures.reduce((promise:any, item:any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {quality: 75}).then(cropped_image => this.photos.push(cropped_image));
      });
    }, Promise.resolve());
  }

  takePicture(){
    let options = {
      quality: 65,
      correctOrientation: true
    };

    this.camera.getPicture(options)
    .then((data) => {
      this.photos = new Array<string>();
      this.cropService
      .crop(data, {quality: 75})
      .then((newImage) => {

        const loading = this.loadingCtrl.create({
          content:"Saving Image...."
        });
        loading.present();
        this.photos.push(newImage);
        this.base64data = 'data:image/jpeg;base64,' + newImage;
        var apiurl="http://oscuz.com/user-manage/APIs/index.php/invoice/savebill";
        var headers = new HttpHeaders();
        /* getting current userid from local stroage and pass it to api */
        
        let data= JSON.stringify({ "uid":this.userdata.id, "imagedata": this.base64data  });
        headers.append('Content-Type','application/x-www-form-urlencoded');
        this.http.post(apiurl,data,{headers:headers}).subscribe(data=>{    
            if(data){
                if(data['status']==200 && data['statuscode']){
                  loading.dismiss();
                
                }else{
                loading.dismiss(); 
                const alert = this.alertCtrl.create({
                  title:'Saving Failed',
                  message:'Wrong Values.',
                  buttons:['Ok']
                }); 
                alert.present(); 
                }
            }
        });
      }, error => console.error("Error cropping image", error));
    }, function(error) {
      console.log(error);
    });
  }

  deletePicture(index){

  }

}