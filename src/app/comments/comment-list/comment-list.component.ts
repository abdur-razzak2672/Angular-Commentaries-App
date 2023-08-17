import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/service/store/app.state';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input("postId") postId: any;

   user: any 

  stars: any[] = [
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false }
  ];

  feedback: any[] = [];
  reply: any[] = [];
  replyForm: FormGroup;
  replyForms: FormArray = this.formBuilder.array([]);

  commentId: any;
  singleCommentId: any;

  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userStore: Store<{ user: { user: any } }>
  ) {
    this.replyForm = this.formBuilder.group({
      comment: ['', Validators.required],
    });

    this.userStore.select('user').subscribe((data:any)=>{
      this.user = data.user;
      console.log("user======",this.user);
    }
    )
  }

  ngOnInit(): void {
    this.getAllFeedback();
  }

  ngOnChanges(changes: any): void {
    if ('postId' in changes) {
      this.postId = changes.postId.currentValue;
    }
  }

  getAllFeedback(): void {

 
    forkJoin([
      this.commentService.getCommentist(),
      this.commentService.getReplytist()
    ]).subscribe(([comments, replies]: [any[], any[]]) => {
      this.feedback = comments.filter((feedback) => feedback.postId === this.postId);
      this.commentId = this.feedback.map((feedback) => feedback.id);
      this.reply = replies.filter((reply) => this.commentId.includes(reply.commentId));
      // Initialize replyForms array with a form group for each comment's reply section
      this.replyForms = this.formBuilder.array(
        this.feedback.map((comment) =>
          this.formBuilder.group({
            commentId: [comment.id],
            replyForm: this.formBuilder.group({
              comment: ['', Validators.required],
            })
          })
        )
      );
    });
  }

  getRepliesForComment(commentId: any): any[] {
    return this.reply.filter((reply) => reply.commentId === commentId,
     
    );
  }

  getReplyFormGroup(commentId: any): FormGroup {
    const formGroup = this.replyForms.controls.find(
      (control) => control.get('commentId')?.value === commentId
    ) as FormGroup;

    // If the form group does not exist, return an empty form group
    if (!formGroup) {
      return this.formBuilder.group({});
    }

    return formGroup.get('replyForm') as FormGroup;
  }

  getReplyFormControl(commentId: any): any {
    const formGroup = this.getReplyFormGroup(commentId);
    return formGroup ? formGroup.controls : null;
  }

  showComment: boolean = false;

  toggleReplies(comment: any): void {
    comment.showReplies = !comment.showReplies;
    this.showComment = true;
    this.singleCommentId = comment.id;

    // Ensure we have a form group for the comment's reply section
    const formGroup = this.replyForms.controls.find(
      (control) => control.get('commentId')?.value === comment.id
    ) as FormGroup;

    // If the form group does not exist, create it and add it to the replyForms array
    if (!formGroup) {
      const newFormGroup = this.formBuilder.group({
        commentId: [comment.id],
        replyForm: this.formBuilder.group({
          comment: ['', Validators.required],
        })
      });
      this.replyForms.push(newFormGroup);
    }
  }

  showReplyText(comment: any): string {
    const commentReplies = this.getRepliesForComment(comment.id);
    return comment.showReplies ? 'Hide Replies' : `View All Reply (${commentReplies?.length})`;
  }

  showReply(comment: any): string {
    return comment.showReplies ? '' : ` Reply `;
  }

  get fc() {
    return this.replyForm.controls;
  }

  onSubmit(comment: any) {
    if (!this.getReplyFormControl(comment.id)?.comment.value) {
      this.toastr.error('No reply added');
      return;
    }

    const newReply = {
      commentId: comment.id,
      name: this.user.name,
      photoUrl: this.user.photoUrl,
      comment: this.getReplyFormControl(comment.id)?.comment.value,
      createdAt: new Date(),
    };

    this.commentService.posReply(newReply).subscribe((data: any) => {
      this.toastr.success('Reply added successfully');
      // Reset the form control for the specific comment
      this.getReplyFormControl(comment.id)?.comment.reset();
      // Refresh the comments and replies after a new reply is added
      this.getAllFeedback();
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
