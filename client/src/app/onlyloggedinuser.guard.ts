/*import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from './user.Service';

@Injectable()
export class OnlyloggedinuserGuard implements CanActivate {
  
  constructor(private userservice:UserService){

    console.log("OnlyLoggedInUsers");
    ///console.log("from OnlyLoggedInUsers"+this.userservice.getUserLoggedIn());
  }
  canActivate(){

/*
    if (this.userservice.getUserLoggedIn()) { 
      return true;
    } else {
     // window.alert("You don't have permission to view this page"); 
      return false;
    }
    
  }
}

*/
