import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/service/contact.service';

import { emailWithAtValidator } from 'src/app/custom-validators';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private contactService: ContactService, // Replace 'ContactService' with the actual service for posting the contact form
    private toastr: ToastrService
  ) {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailWithAtValidator()]),
      message: new FormControl('', [Validators.required])
    });
  }

  get fc() {
    return this.contactForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const contactData = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
      createdAt: new Date()
    };

    if (this.contactForm.invalid) {
      this.toastr.error('Please fill all the fields');
    } else {
      this.contactService.postContact(contactData).subscribe((data: any) => {
        this.toastr.success('Message sent successfully');
        this.contactForm.reset();
        console.log(data);
      });
    }
  }
}
