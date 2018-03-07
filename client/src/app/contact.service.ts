import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactService {

  constructor(private http:HttpClient) { }

  login(userCredentials)
  {
    var headers = new HttpHeaders().set("Content-Type", 'application/json');
    return this.http.post<any>('http://localhost:3000/api/login',userCredentials,{headers:headers})
  }

  register(newuser){
    var headers = new HttpHeaders().set("Content-Type", 'application/json');
    return this.http.post<any>('http://localhost:3000/api/register',newuser,{headers:headers})
  }

  productslist(){
    return this.http.get('http://localhost:3000/api/product_list')
  }

  
  logout()
  {
    return this.http.get('http://localhost:3000/api/logout')
  }

  getContacts()
  {
    return this.http.get('http://localhost:3000/api/contacts')
  }

  addcontact(newContact)
  {
    var headers = new HttpHeaders().set("Content-Type", 'application/json');
    return this.http.post<any>('http://localhost:3000/api/addcontact',newContact,{headers:headers})
  }

  deletecontact(id)
  {
    return this.http.delete('http://localhost:3000/api/deletcontact/'+id)
  }

  updatecontact(update_contact)
  {
    var headers = new HttpHeaders().set("Content-Type", 'application/json');
    return this.http.put<any>('http://localhost:3000/api/updatecontact',update_contact,{headers:headers})
  }

  addtocart(newcartproduct)
  {
    var headers = new HttpHeaders().set("Content-Type", 'application/json');
    return this.http.post<any>('http://localhost:3000/api/addtocart',newcartproduct,{headers:headers})
  }

  get_cart_products(user_id){
    var headers = new HttpHeaders().set("Content-Type", 'application/json');
    return this.http.post<any>('http://localhost:3000/api/get_cart_products',user_id,{headers:headers})
  }
  removefromcart(id)
  {
    return this.http.delete('http://localhost:3000/api/removefromcart/'+id)
  }

  paynow(productbill)
  {
    var headers = new HttpHeaders().set("Content-Type", 'application/json');
    return this.http.post<any>('http://localhost:3000/paynow',productbill,{headers:headers})
  }
}
