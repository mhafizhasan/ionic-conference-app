import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController,
  NavParams
} from 'ionic-angular';

import { ExhibitorData } from '../../providers/exhibitor-data';
import { ExhibitorDetailPage } from '../exhibitor-detail/exhibitor-detail';


@IonicPage()
@Component({
  selector: 'page-exhibitor-list',
  templateUrl: 'exhibitor-list.html',
})
export class ExhibitorListPage {

  exhibitors: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public exhibitorData: ExhibitorData
  ) {}

  ionViewDidLoad() {
    this.exhibitorData.getExhibitors().subscribe((exhibitors: any[]) => {
      this.exhibitors = exhibitors;
    });
  }

  goToExhibitorDetail(exhibitor: any) {

    // this.navCtrl.push(ExhibitorDetailPage, { id: exhibitor.id } );
    this.navCtrl.push(ExhibitorDetailPage, { exhibitor: exhibitor } );

  }

}
