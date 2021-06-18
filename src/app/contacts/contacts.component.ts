import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contact.service';

import { Contact } from 'src/app/model/Contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  updatedList: Contact = {
    id: 0,
    name: '',
    email: '',
    phone: ''
  };
  isEdit: boolean = false;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.fetchContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  newContact(contact: Contact) {
    this.contacts.push(contact);
  }

  editContact(contact: Contact) {
    this.updatedList = contact;
    this.isEdit = true;
  }

  onUpdatedContact(contact: Contact) {
    this.contacts.forEach((con, index) => {
      if (contact.id === con.id) {
        this.contacts.splice(index, 1);
        this.contacts.push(contact);
        this.isEdit = false;
        this.updatedList = {
          id: 0,
          name: '',
          email: '',
          phone: ''
        };
      }
    });
  }

  deleteContact(contact: Contact) {
    if (confirm('Are You Sure?')) {
      this.contactService.deleteContact(contact.id).subscribe(() => {
        this.contacts.forEach((del, index) => {
          if (contact.id === del.id) {
            this.contacts.splice(index, 1);
          }
        });
      });
    }
  }
}
