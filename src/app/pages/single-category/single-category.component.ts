import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {
   posts:any = JSON.parse(localStorage.getItem('posts') || '[]');
  constructor() { }

  ngOnInit(): void {
  }





}
