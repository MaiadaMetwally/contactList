import { Component, OnInit } from '@angular/core';
import * as data from "../../assets/contacts/contacts.json";
import * as recent from "../../assets/contacts/recent-contact.json";
import { FilterPipe } from '../filter.pipe';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: any = [];
  latestContacts: any = [];
  searchTxt: any = "";
  chars: any = [];
  filterContacts: any = [];

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("contacts")) {
      this.contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    else {
      let fileData = JSON.stringify(data);
      this.contacts = JSON.parse(fileData).data;
      localStorage.setItem("contacts", JSON.stringify(this.contacts));
    }
    this.contacts = this.contacts.filter(contact => contact.firstName != null);
    let latestFileData = JSON.stringify(recent);
    this.latestContacts = JSON.parse(latestFileData).data;

    for (let i = 0; i < this.contacts.length; i++) {
      let firstChar = this.contacts[i].firstName.charAt(0);
      if (!this.chars.includes(firstChar.toUpperCase())) {
        this.chars.push(firstChar.toUpperCase());
      }
    }
    this.chars.sort();
    if (this.chars.length > 0) {
      for (let j = 0; j < this.chars.length; j++) {
        this.filterContacts[j] = this.contacts.filter(contact => contact.firstName.charAt(0).toLowerCase() === this.chars[j].toLowerCase());
      }
    }
  }

  addNewContact() {
    this.router.navigateByUrl('/addContact');
  }

}
