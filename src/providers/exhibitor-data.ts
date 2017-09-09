import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

// import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Storage } from '@ionic/storage';

@Injectable()
export class ExhibitorData {
  data: any;
  // url = "http://cioconvex.mampu.gov.my";
  // url = "http://localhost/cioconvex";
  url = "http://192.168.0.222/cioconvex";

  USER_PROFILE = 'userProfile';

  constructor(
    public http: Http,
    public storage: Storage
  ) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get(this.url+'/api.php?action=exhibitors')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    this.data = data.json();
    return this.data;
  }


  getExhibitors() {
    return this.load().map((data: any) => {
      return data;
    });

  }

  rateBooth(star: number, booth: number): void {
    
        this.storage.get(this.USER_PROFILE).then((data) => {
    
          console.log(data.data.entrant_id);
          
          
          var param = JSON.stringify({
            action: 'rate-booth',
            entrant: data.data.entrant_id,
            booth: booth,
            star: star
          });
      
          this.http.post(this.url+'/api.php', param).subscribe(data => {
            console.log(data);
            this.storage.set('booth_'+booth, true);
          });
    
        });
        
      };

  getExhibitorDetail(exhibitorId: string): any {
    return this.http.get(this.url+'/api.php?action=exhibitor-detail&id='+exhibitorId).map(res => res.json());
  }

}
