import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  getContact(){

  }

  postContact(data,email,token){
    return this.http.post<any>(`http://localhost:4000/user/mycontact`,data);
  }
}
