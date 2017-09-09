import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';


@Injectable()
export class UserData {

  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  // HAS_COMPLETED_BOOTH = 'hasCompletedBooth';
  // HAS_COMPLETED_SPEAKER = 'hasCompletedSpeaker';


  USER_PROFILE = 'userProfile';

  // USER_ID = 'userId';
  // USER_FULLNAME = 'userFullname';
  // USER_EMAIL = 'userEmail';
  // USER_PHONE

  status: any;
  profile: any;

  // url = "http://cioconvex.mampu.gov.my";
  // url = "http://localhost/cioconvex"; 
  url = "http://192.168.0.222/cioconvex"; 

  constructor(
    public events: Events,
    public storage: Storage,
    public http: Http
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  rateSpeaker(star: number, speaker: number): void {

    this.storage.get(this.USER_PROFILE).then((data) => {

      console.log(data.data.entrant_id);
      
      
      var param = JSON.stringify({
        action: 'rate-speaker',
        entrant: data.data.entrant_id,
        speaker: speaker,
        star: star
      });
  
      this.http.post(this.url+'/api.php', param).subscribe(data => {
        console.log(data);
        this.storage.set(''+speaker, true);
      });

    });
    
  };

  login(username: string): void {

    // url = this.url+'/api.php';
    var param = JSON.stringify({
      action: 'login',
      email: username
    });

    this.http.post(this.url+'/api.php', param).subscribe(data => {

      this.profile = data.json();

      if(this.profile.status == true) {

        // console.log(this.profile);
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.storage.set(this.USER_PROFILE, this.profile);
        
        console.log('login done');
        
        this.events.publish('user:login');

      } else {

        console.log('Not authorize');
        
      }
      
      

    }, error => {

      console.log('Opps : '+error);
      
    });
    

    // this.storage.set(this.HAS_LOGGED_IN, true);
    // this.setUsername(username);
    // this.events.publish('user:login');

  };

  // signup(username: string): void {
  //   this.storage.set(this.HAS_LOGGED_IN, true);
  //   this.setUsername(username);
  //   this.events.publish('user:signup');
  // };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    // this.storage.remove(this.HAS_SEEN_TUTORIAL);
    this.storage.remove(this.USER_PROFILE);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  getUserProfile(): Promise<any> {
    return this.storage.get(this.USER_PROFILE).then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
