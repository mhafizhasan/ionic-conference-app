import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@IonicPage({
  segment: 'session/:day'
})
@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;

  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams
  ) {}

  ionViewWillEnter() {
 
    this.dataProvider.getSessionDetail(this.navParams.data.sessionId).subscribe((data: any) => { 
      this.session = data.data;    
    });

  }
}
