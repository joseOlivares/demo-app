import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../types/customer';

@Component({
  selector: 'app-view-customers',
  imports: [],
  templateUrl: './view-customers.component.html',
  styleUrl: './view-customers.component.scss'
})
export class ViewCustomersComponent {

  customerService=inject(CustomerService);

  customers:Customer[]=[];

  ngOnInit(){
    this.customerService.getCustomers().subscribe((data:Customer[])=>{
      this.customers=data;
    });
  }
}
