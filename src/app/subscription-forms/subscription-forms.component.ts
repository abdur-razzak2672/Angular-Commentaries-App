import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../service/subscription.service'; 
import { ToastrService } from 'ngx-toastr';
import { emailWithAtValidator } from '../custom-validators';

@Component({
  selector: 'app-subscription-forms',
  templateUrl: './subscription-forms.component.html',
  styleUrls: ['./subscription-forms.component.css']
})
export class SubscriptionFormsComponent implements OnInit {
  subscriptionForm: FormGroup;

  constructor(
    private subscriptionService: SubscriptionService,
    private toastr: ToastrService,
  ) { 
    this.subscriptionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailWithAtValidator()]),
    });
  }

  get fc() {
    return this.subscriptionForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const SubData = {
      name: this.subscriptionForm.value.name,
      email: this.subscriptionForm.value.email,
      createdAt: new Date(),
    };
 
    if (this.subscriptionForm.invalid) {
      this.toastr.error('Please fill all the fields');
    } else {
      this.subscriptionService.postSubscribe(SubData).subscribe((data: any) => {
        this.toastr.success('Successfully Subscribed');
        this.subscriptionForm.reset();
        console.log(data);
       });
    }

    console.log(SubData);
  }
}
