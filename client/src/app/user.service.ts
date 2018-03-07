import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class UserService {
  isLoginSubject = new BehaviorSubject<any>(this.hasToken());
  user_info = new BehaviorSubject<any>(this.userinfo());

  /**
   *
   * @returns {Observable<T>}
   */
  isLoggedIn() : Observable<any> {
    return this.isLoginSubject.asObservable();
  }

  current_user_information() : Observable<any> {
    return this.user_info.asObservable();
  }
 
  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login(user_details) : void {
    this.isLoginSubject.next(true);
    this.user_info.next(user_details);
    console.log('from user serviece test:')
    console.log(this.isLoginSubject);
    console.log(this.user_info);
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout() : void {
    this.isLoginSubject.next(false);
  }

  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken() : any {
    return false;
  }

  private userinfo() : any {
    return {};
  }
}
