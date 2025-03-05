import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer/customer.service';
import { ToastComponent } from '../../core/components/toast/toast.component';

@Component({
  selector: 'app-create-customer',
  imports: [FormsModule,ReactiveFormsModule, ToastComponent],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss'
})
export class CreateCustomerComponent {
  fb=inject(FormBuilder);

  protected toastTitle = 'Success';
  protected toastMessage = 'Customer created';
  protected toastTimeAgo = 'Just now';
  protected toastDuration = 3000;
  protected toastTextBg = 'text-bg-success';



  private customerService = inject(CustomerService);

  formCustomer=this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    razonSocial: ['', [Validators.required]],
    iDEmpresa: [''],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    pais: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
  });


  @ViewChild('toastComponent') toastComponent!: ToastComponent;
  

  createCustomer(){
    if(this.formCustomer.invalid){
      return;
    }

    console.log(this.formCustomer.value);

    this.customerService.createCustomer(this.formCustomer).subscribe({
      next: (data) => {
          console.log('Customer created: ', data);
          this.toastTitle='Success';
          this.toastMessage='Customer created';
          this.toastTimeAgo='Just now';
          this.toastDuration=3000;
          this.toastTextBg='text-bg-success';
          this.showToast();
          // Handle successful creation, e.g., navigate or show a success message
      },
      error: (error) => {
          console.error('Error creating customer:', error);
          console.log('Status: ', error.status);
          this.toastTitle='Error '+error.status;
          this.toastMessage=error.statusText
          this.toastTimeAgo='Just now';
          this.toastDuration=3000;
          this.toastTextBg='text-bg-danger';
          this.showToast();
          // Handle the error, e.g., show an error message to the user
      }
  });
  }

    showToast(){
      this.toastComponent.show();
    }

    hideToast(){
      this.toastComponent.hide();
    }

}
  
