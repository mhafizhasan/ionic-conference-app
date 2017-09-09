import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { ConferenceData } from '../../providers/conference-data';

import { UserData } from '../../providers/user-data';

@IonicPage({
  segment: 'speaker/:speakerId'
})
@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html'
})
export class SpeakerDetailPage {
  speaker: any;
  logged: boolean;
  rated: boolean;
  // userData = UserData;

  constructor(
    public dataProvider: ConferenceData, 
    public userData: UserData,
    public storage: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewWillEnter() {

    this.dataProvider.getSpeakerDetail(this.navParams.data.speakerId).subscribe((data: any) => { 
      this.speaker = data.data;    
    });

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.logged = hasLoggedIn;
    });

    this.storage.get('speaker_'+this.navParams.data.speakerId).then((data) => {
      this.rated = data;
    });

  }

  goToSessionDetail(session: any) {
    this.navCtrl.push('SessionDetailPage', { sessionId: session.id });
  }

  onModelChange(e: any, speaker: number) {
    // console.log(e);
    this.userData.rateSpeaker(e, speaker);
    this.rated = true;
  }

}
