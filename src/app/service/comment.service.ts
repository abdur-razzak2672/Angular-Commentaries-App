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
  replyUrl = 'http://localhost:3000/reply';

  getCommentist():Observable<any[]>{
 
    return this.http.get<any[]>(this.url+"?_sort=id&_order=desc");
}

postComment(comment:any){
  return this.http.post(`${this.url}`,comment);
}

getReplytist():Observable<any[]>{
 
  // return this.http.get<any[]>(this.replyUrl+"?_sort=id&_order=desc");
 return this.http.get<any[]>(this.replyUrl);

}

posReply(comment:any){
return this.http.post(`${this.replyUrl}`,comment);
}
}
