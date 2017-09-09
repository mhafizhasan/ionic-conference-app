import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { TabsPage } from '../tabs-page/tabs-page';
// import { LoginPage } from '../login/login';

import { ExhibitorData } from '../../providers/exhibitor-data';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})
export class QrscannerPage {

  scanData: any;
  options: BarcodeScannerOptions;
  exhibitor: any;
  rated: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    public exhibitorData: ExhibitorData,
    public storage: Storage,
  ) { }

  ionViewWillEnter() {
    
    this.scan();

  }

  ionViewWillLeave() {

    
    // this.navCtrl.push(LoginPage);
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }

  done() {
    // this.navCtrl.popToRoot();
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }

  onModelChange(e: any, booth: number) {
    // console.log(e);
    this.exhibitorData.rateBooth(e, booth);
    this.rated = true;
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

          console.log(barcodeData);
          this.scanData = barcodeData;

          // lookup with server
          this.exhibitorData.getExhibitorDetail(this.scanData.text).subscribe(
            (ex: any) => {

              console.log(ex);

              this.storage.get('booth_'+this.scanData.text).then((data) => {
                
                // if(!data) {
                //   this.rated = true;
                // } else {
                //   this.rated = data;
                // }

                this.rated = data;
                this.exhibitor = ex.data;
                
              });
              
            }
          );

      }, (err) => {
          console.log("Error occured : " + err);
      });
  }

}
