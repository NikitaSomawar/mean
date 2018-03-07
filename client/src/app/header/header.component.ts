import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logout_user;
  constructor(private contactservice:ContactService,private router:Router) { }

  registration(){
    //alert('yes');
    this.router.navigate(['/registration']);
  }

  ngOnInit() {
  }

}
