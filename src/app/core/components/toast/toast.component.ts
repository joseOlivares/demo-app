import { Component,effect, input, model, output } from '@angular/core';
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


   
  //nos permite enviar y recibir datos entre padre e hijo
  showToast=model(false); //two ways data binding



   

  constructor() {
    effect(()=>{

      console.log('showToast: ', this.showToast());
      if(this.showToast()){
        this.show();
      } 
  
    });
  }


  show() {
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new Toast(toastElement); // Crea una instancia de Toast
      toast.show(); // Muestra el Toast
      this.showToast.set(false);
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


