import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private http:HttpClient
  ) { }

  url = ' https://my-commentaries-app.onrender.com/subscribed';

  

  postSubscribe(sub:any){
    return this.http.post(`${this.url}`,sub);
  }
}
