import { Component, inject } from '@angular/core';
import { SucursalService } from '../../services/sucursal/sucursal.service';
import { Sucursal } from '../../types/sucursal';

@Component({
  selector: 'app-sucursales',
  imports: [],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.scss'
})
export class SucursalesComponent {
  sucursalService=inject(SucursalService);

  sucursales:Sucursal[]=[];

  ngOnInit(){
    this.sucursalService.getSucursales().subscribe((data:Sucursal[])=>{
      this.sucursales=data;
    });
  }
}
