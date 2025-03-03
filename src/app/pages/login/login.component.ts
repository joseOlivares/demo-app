import { Component, inject} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fb=inject(FormBuilder);
  loginForm=this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    grant_type: [environment.grantType],
    client_id: [environment.client_id]
  });

  private loginService = inject(LoginService);
   
  login(){
    if(this.loginForm.valid){
      this.loginService.authenticate(this.loginForm).subscribe({
        next: (response) => {
            console.log('Login successful', response);
        },
        error: (error) => {
            console.error('Login failed', error);
        }
    });
    }else{
      this.loginForm.markAllAsTouched();
      // Mostrar mensajes de error o realizar otras acciones
      console.log('Formulario no válido');
    }
  }

}
