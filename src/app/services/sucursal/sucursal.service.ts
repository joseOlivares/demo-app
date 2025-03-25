import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Sucursal } from '../../types/sucursal';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private sucursalApi=environment.sucursalApi;
  private sucursalesApi=environment.sucursalesApi;

  private http=inject(HttpClient);

  constructor() { }

/**
 * Retrieves the list of sucursales from the API.
 * @returns An observable containing the response from the sucursales API.
 */

  getSucursales() {
    return this.http.get<Sucursal[]>(this.sucursalesApi);
  }

  createSucursal(sucursalData: FormGroup) {
    return this.http.post<Sucursal>(this.sucursalApi, sucursalData.value);
  }



}
