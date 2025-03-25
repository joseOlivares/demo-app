import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

/**
 * No se utiliza
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginApi = environment.loginApi;
  private grantType = environment.grantType;

  private http=inject(HttpClient)

  constructor() { }


  authenticate(loginForm: FormGroup) {
    loginForm.controls['grant_type'].setValue(this.grantType);
    console.log('LoginService: authenticate',loginForm.value);



      //const secrets=`${environment.secretUser}:${environment.secretPassword}`;
      //const headers = new HttpHeaders({Authorization:`Basic ${btoa(secrets)}`});
      const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
      return this.http.post(this.loginApi, loginForm.value, { headers });
  }


}
