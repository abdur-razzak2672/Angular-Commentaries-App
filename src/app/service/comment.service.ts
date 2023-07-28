import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http:HttpClient
  ) { }

  url = 'http://localhost:3000/feedback';

  getCommentist():Observable<any[]>{
 
    return this.http.get<any[]>(this.url+"?_sort=id&_order=desc");

}

postComment(comment:any){
  return this.http.post(`${this.url}`,comment);
}
}
