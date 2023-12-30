import { Component } from '@angular/core';
import { Customer } from '../..//models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {

  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
  };
  submitted = false;

  constructor(private customerService: CustomerService,
              private router: Router) { }

  saveCustomer(): void {
    console.log('Into save customer');
    const data = {
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      email: this.customer.email,
      createdDateTime: Date.now(),
      lastUpdatedDateTime: Date.now()
    };
    this.customerService.create({data} as Customer)
          .subscribe({
            next: (res) => {
                this.submitted = true;
                this.router.navigateByUrl('/');
            },
            error: (e) => console.error(e)
          });
  }

  newCustomer(): void {
    this.submitted = false;
    this.customer = {
      firstName: '',
      lastName: '',
      email: ''
    };
  }

}
