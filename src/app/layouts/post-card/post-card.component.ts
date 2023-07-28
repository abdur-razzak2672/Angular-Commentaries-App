import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input('post') post: any;
  createdAtFormatted: any;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.createdAtFormatted = this.getCreatedAtFormatted(this.post?.createdAt);
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
