import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from './user.Service';
import {Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userservice:UserService,private router:Router){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var loggedIn;
    this.userservice.isLoggedIn()
      .subscribe(res =>{loggedIn = res;})
    console.log('user status from auth guard');
    console.log(loggedIn);
    if(loggedIn)
    {  
      return loggedIn;
    }
    else
    {
      console.log('here');
     // this.router.navigate(['/']);
      return loggedIn;
    }

  }
}
