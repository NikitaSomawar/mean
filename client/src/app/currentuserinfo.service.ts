import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class CurrentuserinfoService {
  private current_userinfo = new BehaviorSubject<any>({});
  userinfo = this.current_userinfo.asObservable();
  constructor() { }

  setcurrentuserinfo(result){
   this.current_userinfo.next(result);
   console.log("this.userinfo");
   console.log(this.current_userinfo);
  }
  
}
