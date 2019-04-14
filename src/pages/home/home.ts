import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data="";
  constructor(public navCtrl: NavController, private camera: Camera,
    private barcode: BarcodeScanner, private socialSharing: SocialSharing) {

  }

  opencamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum : true,
      cameraDirection: this.camera.Direction.FRONT,
      allowEdit:true,
      correctOrientation:true
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
     }, (err) => {
      // Handle error
     });
  }

  openbarcodeScanner(){
    this.barcode.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data=barcodeData.text;
     }).catch(err => {
         console.log('Error', err);
     });
  }

  openSharing(){
    // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      // Share via email
      this.socialSharing.shareViaEmail('Test Messages', 'Test ionic native', ['beerbc16@gmail.com']).then(() => {
        this.data = "sent";
      }).catch(() => {
        this.data = "error";
      });
    }).catch(() => {
      // Sharing via email is not possible
    });
  }

  openSharingFacebook(){
    this.socialSharing.shareViaFacebookWithPasteMessageHint("This is a message from Ionic",'','https://ionicframework.com/docs/v3/native/social-sharing/',"This is a message from Ionic")
      .then(
        ()=>{
          this.data = "Facebook Shared";
        }
      )
      .catch(
        (e)=>{
          this.data = e.message;
        }
      );
  }

}
