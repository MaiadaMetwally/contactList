import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  filterContacts: any = [];
  transform(contacts: any[], searchTxt?: any): any {
    this.filterContacts = [];
    if (!contacts) return [];
    if (!searchTxt) return contacts;
    for (let j = 0; j < contacts.length; j++) {
      if (contacts[j].filter(contact => contact.firstName.toLowerCase().includes(searchTxt.toLowerCase())).length > 0)
        this.filterContacts[j] = contacts[j].filter(contact => contact.firstName.toLowerCase().includes(searchTxt.toLowerCase()));
    }
    return this.filterContacts;
  }

}
