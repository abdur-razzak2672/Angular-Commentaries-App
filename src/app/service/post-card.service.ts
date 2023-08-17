import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostCardService {

 
  constructor(private http:HttpClient) {}
  url = ' https://my-commentaries-app.onrender.com/post';

  getAllPost(page:number,pageLimit:number):Observable<Post[]>{
 
     return this.http.get<Post[]>(this.url+"?_sort=id&_order=desc"+`&_page=${page}&_limit=${pageLimit}`);

 }

 getPostList():Observable<Post[]>{
 
     return this.http.get<Post[]>(this.url+"?_sort=id&_order=desc");

 }

 PostDetail(id:number){
  return this.http.get(`${this.url}/${id}`);
}

postComment(id:number,comment:any){
  return this.http.put(`${this.url}/${id}/`,comment);
}
   
}
