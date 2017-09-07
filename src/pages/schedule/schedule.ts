import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  // @ViewChild('scheduleListDay2', { read: List }) scheduleListDay2: List;

  dayIndex = 0;
  queryText = '';
  segment = 'day1';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  day1: any = [];
  day2: any = [];
  category = 'ionic';

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule(); 
  }

  updateSchedule() {
    
    if(this.segment === 'day2') {
      this.dayIndex = 1;
    } else {
      this.dayIndex = 0;
    }

    // Close any open sliding items when the schedule updates
    // this.scheduleList && this.scheduleList.closeSlidingItems();
    // this.scheduleListDay2 && this.scheduleListDay2.closeSlidingItems();

    this.confData.getTimeline(this.queryText).subscribe((data: any) => {
      
      // console.log(data);

      this.shownSessions = data.shownSessions;
      // this.groups = data.data;
      this.day1 = data.day1;
      this.day2 = data.day2;

      if(this.segment == "day1") {
        this.day2.hide = true;
        this.day1.hide = false;
      }

      if(this.segment == "day2") {
        this.day2.hide = false;
        this.day1.hide = true;
      }

    });

  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.ciosession_id});
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.queryText).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Sessions have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }
}
