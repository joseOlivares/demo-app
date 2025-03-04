import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss'
})
export class CreateCustomerComponent {
  fb=inject(FormBuilder);

  formCustomer=this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    razonSocial: ['', [Validators.required]],
    iDEmpresa: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    pais: ['', [Validators.required]],
  });


  createCustomer(){
    
  }


}
  
