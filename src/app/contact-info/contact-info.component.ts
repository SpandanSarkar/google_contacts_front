import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  constructor(private ContactService:ContactService) { }

  ngOnInit(): void {
  }

}
