import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})
export class QrscannerPage {

  scanData: any;
  options: BarcodeScannerOptions;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner
  ) { }

  ionViewWillEnter() {
    
    this.scan();

  }

  ionViewWillLeave() {

    // this.navCtrl.pop();
    this.navCtrl.push(LoginPage);

  }

  scan() {
      this.options = {
          prompt : "Scan your barcode "
      }
      this.barcodeScanner.scan(this.options).then((barcodeData) => {

        // alert("We got a barcode\n" +
        //   "Result: " + barcodeData.text + "\n" +
        //   "Format: " + barcodeData.format + "\n" +
        //   "Cancelled: " + barcodeData.cancelled);

          console.log('+++');
          console.log(barcodeData);
          this.scanData = barcodeData;
          this.scanData.xxx = "XXX";

      }, (err) => {
          console.log("Error occured : " + err);
      });
  }

}
