import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginRequest, loginResponse } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  login (data:loginRequest): Observable <loginResponse> {
    return this.http.post<loginResponse>('https://reqres.in/api/login?delay=5',data);
  }
}
