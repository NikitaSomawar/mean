import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers:[ContactService]
})

export class RegistrationComponent implements OnInit {
  username;
  email;
  contact;
  password;
  res;

  constructor(private router:Router,private contactservice:ContactService) { }

  register(){
    var username = this.username;
    var email = this.email;
    var contact = this.contact;
    var password = this.password;
    var newuser = {"username":username,"email":email,"contact":contact,"password":password};
    this.contactservice.register(newuser)
      .subscribe( res => {
        this.res = res;
        if(res.status=="200")
        {
          alert('you have registred ');
          setTimeout((router: Router) => {
            this.router.navigate(['/']);
        }, 2000);  //2s
        }
        else if(res.status=="409")
        {
          alert('this user is already present');
        }
      }); 
  }

  ngOnInit() {
  }

}
