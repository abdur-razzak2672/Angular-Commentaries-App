import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http:HttpClient
  ) { }

  url = ' https://my-commentaries-app.onrender.com/contact';

  

  postContact(con:any){
    return this.http.post(`${this.url}`,con);
  }
}
