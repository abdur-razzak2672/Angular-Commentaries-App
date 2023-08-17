import { Component,OnInit ,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
 import { ActivatedRoute } from '@angular/router';
 import { CommentService } from 'src/app/service/comment.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/service/store/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
@Input("postId") postId: any;
 
  commentForm: FormGroup
  ratting: any;
  user: any;
 
 
  stars: any[] = [
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userStore: Store<{ user: { user: any } }>


  ) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      ratting: ['', Validators.required],
    });

    this.userStore.select('user').subscribe((data:any)=>{
      this.user = data.user;
      console.log("user======",this.user);
    }
    )
   }
  ngOnInit(): void {
    console.log(this.ratting);
    this.postId = this.route.snapshot.paramMap.get('id');

  }

  ngOnChanges(changes: any): void {
    if ('postId' in changes) {
      this.postId = changes.postId.currentValue;
      console.log(this.postId);
      console.log("Fdfsfdr",this.postId);

    }
  }

  get fc() {
    return this.commentForm.controls;
  }

  rate(star: any): void {
    console.log(star);
    const index = this.stars.indexOf(star);
    this.ratting = index+1;
    console.log( this.ratting);

    for (let i = 0; i <= index; i++) {
      this.stars[i].filled = true;
    }
    for (let i = index + 1; i < this.stars.length; i++) {
      this.stars[i].filled = false;
    }
  }



  
  onSubmit() {
 
    const CommentData = {
          comment:this.commentForm.value.comment,
          ratitng:this.ratting,
          postId:this.postId,
          name:this.user.name,
          photoUrl:this.user.photoUrl,
          createdAt: new Date(),

        }
     
    if(this.ratting == "" || this.ratting == undefined || this.ratting == null){
      this.toastr.error('Please give a rating');
    }else{
      this.commentService.postComment(CommentData).subscribe((data:any) => {
        this.toastr.success('Comment Add Successfully');
        this.commentForm.reset();
        this.ratting = "";
        console.log(data);
        window.location.reload();
      })
 

    }



    console.log(CommentData);
  }

}
