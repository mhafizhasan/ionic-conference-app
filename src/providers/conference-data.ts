import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class ConferenceData {

  data: any;
  // url = "http://cioconvex.mampu.gov.my";
  // url = "http://localhost/cioconvex";
  url = "http://192.168.0.222/cioconvex";

  constructor(public http: Http, public user: UserData) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get(this.url+'/api.php?action=schedules')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();
    return this.data;
  }

  // Get List of Speakers
  getSpeakers() {
    return this.http.get(this.url+'/api.php?action=speakers').map(res => res.json());
  }

  // Get Speaker Details
  getSpeakerDetail(speakerId: string): any {
    return this.http.get(this.url+'/api.php?action=speaker-detail&id='+speakerId).map(res => res.json());
  }

  // Get Session Details
  getSessionDetail(sessionId: string): any {
    return this.http.get(this.url+'/api.php?action=session-detail&id='+sessionId).map(res => res.json());
  }

  // Get Timeline for Agendas
  getTimeline(queryText = '') {

    return this.load().map((data: any) => {

      let day = data.data;    
      day.shownSessions = 10;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      // console.log('queryWords: '+queryWords);

      day.day1 = [];
      day.day2 = [];
  
      // loop to seperate by day
      day.forEach((d: any) => {
  
        if(queryWords.length) {

          queryWords.forEach((queryWord: string) => {
            if (d.ciosession_name.toLowerCase().indexOf(queryWord) > -1) {
              // matchesQueryText = true;
              if(d.event_date == "05 Oct 2017") {
                  day.day1.push(d);
              } else {
                  day.day2.push(d);
              }
            }
          });
          
      
        } else {

          if(d.event_date == "05 Oct 2017") {
              day.day1.push(d);
          } else {
              day.day2.push(d);
          }

        }
        
        
  
      });

      return day;

    });
  }

  filterSession(session: any, queryWords: string[], excludeTracks: any[], segment: string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }


  // getTracks() {
  //   return this.load().map((data: any) => {
  //     return data.tracks.sort();
  //   });
  // }
}
