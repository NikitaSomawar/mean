import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Router} from '@angular/router';
import {UserService} from '../user.Service';
import {CurrentuserinfoService} from '../currentuserinfo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ContactService,CurrentuserinfoService]
})
export class LoginComponent implements OnInit {
  username;
  password; 
  res;
  constructor(private contactservice:ContactService,private router:Router,private userservice:UserService,private Currentuserinfo:CurrentuserinfoService) { }


  loginuser(){
    var username = this.username;
    var password = this.password;
    var userCredentials = {"username":username,"password":password};
    this.contactservice.login(userCredentials)
      .subscribe( res => {
        this.Currentuserinfo.setcurrentuserinfo(res.result[0]);
        //this.Currentuserinfo.getuserinfo();
        this.res = res;
        console.log("I CANT SEE DATA HERE: ", this.res);
        console.log(res.status);
        if(res.status == "200")
        {
          var setloggedin =  this.userservice.login(res.result);
          this.router.navigate(['/home']);
        }
        else
        {
          alert('check your credentials');
        }
      });
      
  }
  ngOnInit() {
  }

}
