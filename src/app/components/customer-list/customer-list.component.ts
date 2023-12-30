import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  currentCustomer: Customer = {};
  currentIndex = -1;
  title = '';
  updatedRow : number = 0;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.retrieveCustomers();
  }

  retrieveCustomers(): void {
      if (sessionStorage.getItem('rowIndex')) {
        this.updatedRow = Number(sessionStorage.getItem('rowIndex'));
      }
      console.log(this.updatedRow);
      this.customerService.getAll()
      .subscribe({
        next: (data) => {
          this.customers = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCustomers();
    this.currentCustomer = {};
    this.currentIndex = -1;
  }

  setActiveCustomer(customer: Customer, index: number): void {
    this.currentCustomer = customer;
    this.currentIndex = index;
  }

  updateRow(customer: Customer, index: number): void {
    console.log(customer);
    this.customerService.update(customer.id, customer)
      .subscribe({
        next: () => {
          sessionStorage.clear();
          sessionStorage.setItem('rowIndex', index.toString());
          this.retrieveCustomers();
        },
        error: (e) => console.error(e)
      });
  }
}
