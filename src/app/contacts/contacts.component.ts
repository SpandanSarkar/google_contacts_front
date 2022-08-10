import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(  private formBuilder: FormBuilder,
    private ContactService:ContactService,
    private router: Router) { }
    contactForm!: FormGroup;

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: ['', Validators.required],
      job: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      note: ['', Validators.required],
    });
  }

  submitContact() {
    // console.log(this.loginForm.value);
    if (this.contactForm.valid) {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      let jwtData = token.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      let email = decodedJwtData.email;
      this.ContactService.postContact(this.contactForm.value,email,token)
      .subscribe({
        next:res=>{
          console.log(res);
        }
      })
    }
  }
}
