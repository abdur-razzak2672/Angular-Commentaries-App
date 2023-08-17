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
  createdAtFormatted: any;
  date: any;
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
      this.createdAtFormatted = this.getCreatedAtFormatted(this.postData?.createdAt);

      this.spinner.hide();
    });
  }


  private getCreatedAtFormatted(createdAt: string | null): string {
    if (!createdAt) {
      return '';
    }

    const createdDate = new Date(createdAt);
    const now = new Date();

    const timeDifference = Math.floor((now.getTime() - createdDate.getTime()) / 1000); // Time difference in seconds

    const days = Math.floor(timeDifference / (60 * 60 * 24));
    const hours = Math.floor((timeDifference % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeDifference % (60 * 60)) / 60);

    let formattedTime = '';
    if (days > 0) {
      formattedTime += `${days} day `;
    }
    if (hours > 0) {
      formattedTime += `${hours} hour `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes} min`;
    }

    return formattedTime.trim();
  }


}
 