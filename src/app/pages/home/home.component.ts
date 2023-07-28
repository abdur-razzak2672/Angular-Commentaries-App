import { Component,OnInit } from '@angular/core';
import { PostCardService } from '../../service/post-card.service';
import { Post } from '../../models/interface';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(
      private postCardService:PostCardService,
      private spinner: NgxSpinnerService
  ){}

  posts:Post[] = [];
  

  ngOnInit(): void {
    console.log("Home Component Loaded",this.posts); 
      this.getPostList();
    
  }

  getPostList(){
      this.spinner.show();
      this.postCardService.getPostList().subscribe((data:Post[])=>{
          this.posts = data;
          console.log("Home Component Loaded",this.posts); 
          localStorage.setItem('posts', JSON.stringify(this.posts));

          this.spinner.hide();
      });
  }



}
