import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@IonicPage({
  segment: 'session/:sessionId/day/:day'
})
@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;
  dayIndex: 0;

  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      
      this.dayIndex = this.navParams.data.day;
      
      if (
        data &&
        data.schedule &&
        data.schedule[this.dayIndex] &&
        data.schedule[this.dayIndex].groups
      ) {
        for (const group of data.schedule[this.dayIndex].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    });
  }
}
