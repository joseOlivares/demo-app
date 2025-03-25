import { Component, ViewChild,inject } from '@angular/core';
import { ToastComponent } from '../../core/components/toast/toast.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SucursalService } from '../../services/sucursal/sucursal.service';

@Component({
  selector: 'app-crear-sucursal',
  imports: [FormsModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './crear-sucursal.component.html',
  styleUrl: './crear-sucursal.component.scss'
})
export class CrearSucursalComponent {
  fb=inject(FormBuilder);

  protected toastTitle = 'Success';
  protected toastMessage = 'Customer created';
  protected toastTimeAgo = 'Just now';
  protected toastDuration = 3000;
  protected toastTextBg = 'text-bg-success';



  private sucursalService = inject(SucursalService);

  formSucursal=this.fb.group({
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    estadoOProvincia: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    pais: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    horario: ['', [Validators.required]],
  });


  @ViewChild('toastComponent') toastComponent!: ToastComponent;


  crearSucursal(){
    if(this.formSucursal.invalid){
      return;
    }

    console.log(this.formSucursal.value);

    this.sucursalService.createSucursal(this.formSucursal).subscribe({
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
          this.formSucursal.reset();
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
