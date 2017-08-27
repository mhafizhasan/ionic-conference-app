import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ExhibitorData } from '../../providers/exhibitor-data';

@IonicPage()
@Component({
  selector: 'page-exhibitor-detail',
  templateUrl: 'exhibitor-detail.html',
})
export class ExhibitorDetailPage {

  exhibitor: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public exhibitorData: ExhibitorData
  ) {}

  ionViewWillEnter() {
    
    this.exhibitor = this.navParams.data.exhibitor;

    // this.exhibitorData.getExhibitorDetail(this.navParams.data.id).subscribe(
    //   (data: any) => {
    //     this.exhibitor = data;
    //   }
    // );

  }

}
