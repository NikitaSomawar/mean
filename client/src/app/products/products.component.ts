import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ContactService} from '../contact.service';
import {UserService} from '../user.Service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  //pipes:[CatfilterPipe];

})
export class ProductsComponent implements OnInit {
  user_info;
  products;
  constructor(private router:Router,private contactservice:ContactService,private userservice:UserService) { }
  res;
  arr=[1,2,3,4,5,6];
  userinfo;
  addtocart(selected_product){
    var user_id = this.user_info[0].id;
    console.log("testing:"+user_id);
    var newcartproduct = {"user_id":user_id,"product_id":selected_product};
    console.log(newcartproduct);
    this.contactservice.addtocart(newcartproduct)
    .subscribe(res => {
      this.res = res;
      console.log(this.res);
      console.log("status is"+ this.res.status);
      if(this.res.status=='200')
      {
         alert('added to cart');
      }
      else if(this.res.status=='409')
      {
         alert('product is already in cart');
      }
    });
  }

  ngOnInit() {
    this.userservice.current_user_information()
    .subscribe(user_info =>{this.user_info = user_info;})
   // this.getloggedin = this.isLoggedIn;
    console.log(this.user_info);

    this.contactservice.productslist()
    .subscribe(products=>{
      this.products = products;
      console.log(products);
    });
  }

}
