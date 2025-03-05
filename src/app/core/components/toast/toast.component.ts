import { Component, effect, input } from '@angular/core';
import { Toast } from 'bootstrap'; // Importa Toast de Bootstrap
//Fue necesario instalar los types de boostrap npm install --save-dev @types/bootstrap
@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  title=input('Notification');
  message=input('Message');
  timeAgo=input('Just now');
  duration=input(3000);
  textBg=input('');






  //isVisible=input(false);

  constructor() {

  }


  show() {
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new Toast(toastElement); // Crea una instancia de Toast
      toast.show(); // Muestra el Toast
    }
  }

  hide(){
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new Toast(toastElement); // Crea una instancia de Toast
      toast.hide(); // Muestra el Toast
    }
  }


}


