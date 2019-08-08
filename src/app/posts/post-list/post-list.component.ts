import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnChanges {

  @Input()
  posts: Post[] = [];

  constructor() { }

  ngOnInit() {
    // this.posts = [];
  }

  ngOnChanges() {
    console.log("chnage")
    console.log(this.posts);
  }

}
