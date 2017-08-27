import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

// import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class ExhibitorData {
  data: any;

  constructor(public http: Http) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('http://localhost/api.cioconvex/api.php?action=exhibitors')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    
    this.data = data.json();

    return this.data;
  }


  getExhibitors() {

    // return this.http.get('assets/data/exhibitor.json').map(res => res.json());

    return this.load().map((data: any) => {

      return data.exhibitors;

    });

  }

  getExhibitorDetail(exhibitorId: string): any {
    return this.http.get('http://localhost/api.cioconvex/api.php?action=exhibitor-detail&id='+exhibitorId).map(res => res.json());
  }

  // getTracks() {
  //   return this.load().map((data: any) => {
  //     return data.tracks.sort();
  //   });
  // }

  // getMap() {
  //   return this.load().map((data: any) => {
  //     return data.map;
  //   });
  // }

}
