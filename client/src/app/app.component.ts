import { Component } from '@angular/core';
import {UserService} from './user.Service';
import { Observable } from "rxjs";
import { MaincomponentComponent } from './maincomponent/maincomponent.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mytitle = 'app';
  getloggedin;
  isLoggedIn : Observable<boolean>;
  constructor(private userservice:UserService){
  }
  
  ngOnInit() {
   
    this.userservice.isLoggedIn()
    .subscribe(res =>{this.getloggedin = res;})
   // this.getloggedin = this.isLoggedIn;
    console.log(this.getloggedin);
    //console.log(this.isLoggedIn.source.observers);

  }
}
