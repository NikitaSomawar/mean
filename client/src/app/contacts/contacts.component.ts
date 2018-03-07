import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Router} from '@angular/router';
import {UserService} from '../user.Service';
import { ComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers:[ContactService]
})
export class ContactsComponent implements OnInit {
  contacts;
  added_status;
  res;
  name;
  contact;
  updatecontact_clicked;
  editname;
  editcontact;
  update_status;
  editid;
  constructor(private contactservice:ContactService,private router:Router,private userservice:UserService) { }

  showproducts(){
    this.router.navigate(['/productslist']);
  }

  updatecontact(updatecontact){
    this.updatecontact_clicked = updatecontact;
    console.log('from update');
    console.log(this.updatecontact_clicked);
    this.editname = this.updatecontact_clicked.name;
    this.editcontact = this.updatecontact_clicked.contact;
    this.editid = this.updatecontact_clicked.id;
    console.log(this.editid);
  }

  updatecontactdata(){
    var editname = this.editname;
    var editcontact = this.editcontact;
    console.log(editname);
    var id = this.editid;

    var update_contact = {"name":editname,"contact":editcontact,"id":id};
      this.contactservice.updatecontact(update_contact)
      .subscribe( res => {
        this.res = res;
        console.log(this.contacts.result);
       // this.contacts.result.push({"name":name,contact:"contact"});
        console.log("I CANT SEE DATA HERE: ", this.res);
        this.update_status = 'updated successfully';
        for (var i = 0; i < this.contacts.result.length; i++) {
          if (this.contacts.result[i].id === id) {
            this.contacts.result[i] = update_contact;
            break;
          }
        }
        setTimeout(() => {
          this.update_status = '';
        }, 2000);
      });
  }

  addcontact(){
    var name = this.name;
    var contact = this.contact;
   // alert(name);
    var newcontact = {"name":name,"contact":contact};
      this.contactservice.addcontact(newcontact)
      .subscribe( res => {
        this.res = res;
        console.log(this.contacts.result);
        this.contacts.result.push({"name":name,contact:"contact"});
        console.log("I CANT SEE DATA HERE: ", this.res);
        this.added_status = 'added successfully';

        setTimeout(() => {
          this.added_status = '';
        }, 2000);
      });
  

  }

  deleterecord(id){
    var contacts = this.contacts;
    //alert(id);
    this.contactservice.deletecontact(id)
    .subscribe( res => {
      this.res = res;
      console.log("I CANT SEE DATA HERE: ", this.res);
      console.log("length is:"+contacts.result.length);
      for (var i = 0; i < contacts.result.length; i++) {
        if (contacts.result[i].id === id) {
          contacts.result.splice(i, 1);
          break;
        }
      }
    });

  }

  ngOnInit() {
    
        this.contactservice.getContacts()
        .subscribe( contacts => {
          this.contacts =contacts;
          /*
          if(contacts.status == "403")
          {
            this.router.navigate(['/']);
          }
          */
          console.log(this.contacts.status);
       
        });
   
  }

}
