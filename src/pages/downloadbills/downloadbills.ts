import { Component } from '@angular/core';
import { NavController, ActionSheetController,LoadingController,ToastController,Platform,Loading} from 'ionic-angular';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
declare var cordova: any;

@Component({
  selector: 'page-downloadbills',
  templateUrl: 'downloadbills.html',
})
export class DownloadbillsPage {
  userdata:any;
  photos : Array<string>;
  base64data: string;
  alertCtrl: any;
  lastImage: string = null;
  loading: Loading;
  images = [];
  targetpath:any = [];
  counter = 0;

  constructor(
    private http : HttpClient,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    private loadingCtrl: LoadingController,
    public camera: Camera,
    public cropService: Crop,
    private transfer: Transfer, private file: File, private filePath: FilePath,
    public toastCtrl: ToastController,
    public platform: Platform
  ) {
    this.userdata=JSON.parse(localStorage.getItem('userdata'));
  }

    public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: true,
    correctOrientation: true,
    allowEdit: true,
    targetWidth: 300,
    targetHeight: 300,
  };

 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
     // alert("working"+err);
  });
}


// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
       this.images.push(newFileName);
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}


//delete image
deleteImage(index){
  this.images.splice(index, 1);
}

public uploadImage() {
  // Destination URL
  let server_images=[];

  var url = "http://oscuz.com/app_upload/index.php";
 
 
  var options;

   
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
  let image_counter = 0;

  this.images.forEach(element1 => {
      options = {
      fileKey: "file",
      fileName: element1,
      chunkedMode: false,
      mimeType: "multipart/form-data",
    };
    const fileTransfer: TransferObject = this.transfer.create();
      
       // Use the FileTransfer to upload the image
    fileTransfer.upload(this.pathForImage(element1), url, options).then(data => {
                this.loading.dismissAll();

                 
                 // server_images.push(data.response);
                  image_counter++;
                 if (image_counter == this.images.length) {
                  this.presentToast("Images uploaded");
                   
                 }
    }, 
    err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
   });

}

  // presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Choose or take a picture',
  //     buttons: [
  //       {
  //         text: 'Take a picture',
  //         handler: () => {
  //           this.takePicture();
  //         }
  //       },
  //       {
  //         text: 'Choose pictures',
  //         handler: () => {
  //           this.openImagePicker();
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

  // openImagePicker(){
  //   let options = {
  //     maximumImagesCount: 5,
  //   }
  //   this.photos = new Array<string>();
  //   this.imagePicker.getPictures(options)
  //   .then((results) => {
  //     this.reduceImages(results).then(() => {
  //       console.log('all images cropped!!');
  //     });
  //   }, (err) => { console.log(err) });
  // }

  // reduceImages(selected_pictures: any) : any{
  //   return selected_pictures.reduce((promise:any, item:any) => {
  //     return promise.then((result) => {
  //       return this.cropService.crop(item, {quality: 75}).then(cropped_image => this.photos.push(cropped_image));
  //     });
  //   }, Promise.resolve());
  // }

  // takePicture(){
  //   let options = {
  //     quality: 65,
  //     correctOrientation: true
  //   };

  //   this.camera.getPicture(options)
  //   .then((data) => {
  //     this.photos = new Array<string>();
  //     this.cropService
  //     .crop(data, {quality: 75})
  //     .then((newImage) => {

  //       const loading = this.loadingCtrl.create({
  //         content:"Saving Image...."
  //       });
  //       loading.present();
  //       this.photos.push(newImage);
  //       this.base64data = 'data:image/jpeg;base64,' + newImage;
  //       var apiurl="http://oscuz.com/user-manage/APIs/index.php/invoice/savebill";
  //       var headers = new HttpHeaders();
  //       /* getting current userid from local stroage and pass it to api */
        
  //       let data= JSON.stringify({ "uid":this.userdata.id, "imagedata": this.base64data  });
  //       headers.append('Content-Type','application/x-www-form-urlencoded');
  //       this.http.post(apiurl,data,{headers:headers}).subscribe(data=>{    
  //           if(data){
  //               if(data['status']==200 && data['statuscode']){
  //                 loading.dismiss();
                
  //               }else{
  //               loading.dismiss(); 
  //               const alert = this.alertCtrl.create({
  //                 title:'Saving Failed',
  //                 message:'Wrong Values.',
  //                 buttons:['Ok']
  //               }); 
  //               alert.present(); 
  //               }
  //           }
  //       });
  //     }, error => console.error("Error cropping image", error));
  //   }, function(error) {
  //     console.log(error);
  //   });
  // }

  // deletePicture(index){

  // }

}