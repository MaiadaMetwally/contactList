import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  url: any = "../../assets/img/user.png";

  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  mobileNumberFormControl = new FormControl('', [Validators.required, Validators.pattern(/(\(?[0-9]{3}\)?-?\s?[0-9]{3}-?[0-9]{4})/)]);
  codeFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  contactForm: FormGroup = new FormGroup({
    email: this.emailFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    mobileNumber: this.mobileNumberFormControl,
    code: this.codeFormControl
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  addContact(isValidData, contactData) {
    if (isValidData) {
      let contacts = JSON.parse(localStorage.getItem("contacts"));
      contactData.image = this.url;
      contacts.push(contactData);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      this.router.navigateByUrl('/');
    }
  }

}
