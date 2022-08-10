import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  constructor(private http: HttpClient) {}

  register(data) {
    return this.http.post<any>('http://localhost:4000/user/register', data);
  }

  login(data) {
    return this.http.post<any>(`http://localhost:4000/user/login/`, data);
  }
}
