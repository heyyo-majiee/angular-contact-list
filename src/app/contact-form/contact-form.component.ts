import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ContactService } from 'src/app/contact.service';

import { Contact } from 'src/app/model/Contact';
import { ContactComponent } from '../contact/contact.component';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Output() newContact: EventEmitter<Contact> = new EventEmitter();
  @Output() updatedContact: EventEmitter<Contact> = new EventEmitter();
  @Input() updatedList: Contact;
  @Input() isEdit: boolean;

  constructor(private ContactService: ContactService) { }

  ngOnInit() {
  }

  addNewContact({ name, email, phone }) {
    if (!name || !email || !phone) {
      alert('Please fill up the fields');
    } else {
      this.ContactService.addContact({ name, email, phone } as Contact).subscribe(contact => {
        this.newContact.emit(contact);

      });
    }
  }

  updateContact() {
    this.ContactService.updateContact(this.updatedList).subscribe(contact => {
      console.log(contact);
      this.isEdit = false;
      this.updatedContact.emit(contact);
    });
  }



}
