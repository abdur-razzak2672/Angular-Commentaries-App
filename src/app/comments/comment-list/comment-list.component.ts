import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input("postId") postId: any;

   stars: any[] = [
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false }
  ];

  feedback: any[] = [];

  constructor(
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.getAllFeedback()

    }

   ngOnChanges(changes: any): void {
    if ('postId' in changes) {
      this.postId = changes.postId.currentValue;
      console.log(this.postId);
      console.log("Fdfsfdr",this.postId);

    }
  }

   getAllFeedback(): void {
      this.commentService.getCommentist().subscribe((data:any[]) => {
       console.log(data);

       this.feedback = data.filter((feedback) => feedback.postId === this.postId);

       console.log("razzak",this.feedback);
      
 
     });
   }
  
 

  showComment: boolean = false;

  toggleReplies(comment: any): void {
    comment.showReplies = !comment.showReplies;
    this.showComment = true;
  }

  showReplyText(comment: any): string {
    return comment.showReplies ? 'Hide Replies' : `View All Reply (${comment.reply?.length})`;
  }

  showReply (comment: any): string {
    return comment.showReplies ? '' : ` Reply `;
  }

}
