import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http:HttpClient
  ) { }

  url = 'http://localhost:3000/contact';

  

  postContact(con:any){
    return this.http.post(`${this.url}`,con);
  }
}
