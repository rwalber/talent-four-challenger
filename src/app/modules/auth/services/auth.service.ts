import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export type CallBackRequest<T> = (success: boolean, responseObject: T | string) => void;

interface Credencials {
  username: string;
  password: string;
  client_id: string;
  grant_type: string;
  client_secret: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  login(credencials: Credencials, callBack: CallBackRequest<any>): void {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const params = new URLSearchParams({
      username: credencials.username,
      password: credencials.password,
      client_id: credencials.client_id,
      client_secret: credencials.client_secret,
      grant_type: credencials.grant_type
    });

    this.http.post(`${environment.authURL}`, params, { headers: headers }).subscribe({
      next: (body: any) => {
        callBack(true, body);
      },
      error: error => {
        const errorMensager = error.error.error === 'invalid_grant' ? 'Usuário ou senha inválidos' : error.error.error_description;
        callBack(false, errorMensager);
      }
    });
  }
}
