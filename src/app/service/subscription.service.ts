import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private http:HttpClient
  ) { }

  url = 'http://localhost:3000/subscribed';

  

  postSubscribe(sub:any){
    return this.http.post(`${this.url}`,sub);
  }
}
