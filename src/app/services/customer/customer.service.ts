import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Customer } from '../../types/customer';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http=inject(HttpClient);
  private customersApi=environment.customersApi;
  

  constructor() { }


   
  getCustomers(){
    return this.http.get<Customer[]>(this.customersApi);
  }

  createCustomer(formCustomer:FormGroup){
    return this.http.post(this.customersApi, formCustomer.value);
  }


}
