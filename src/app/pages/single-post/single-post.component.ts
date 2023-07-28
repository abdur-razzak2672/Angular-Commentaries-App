import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/interface';
import { PostCardService } from '../../service/post-card.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

 
@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  posts:any = JSON.parse(localStorage.getItem('posts') || '[]');
  postData:any;
  id :any;
  constructor(
    private route:ActivatedRoute,
    private postCardService:PostCardService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getPostDetails();

  }

  getPostDetails(){
  this.id = this.route.snapshot.paramMap.get('id');
    this.spinner.show();
    this.postCardService.PostDetail(this.id).subscribe((data:any)=>{
      this.postData = data;
      console.log("Single Post Component Loaded",this.postData);
      this.spinner.hide();
    });
  }


}
 