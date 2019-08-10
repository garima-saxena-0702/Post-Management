import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {NgForm} from '@angular/forms'

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  // enteredContent = '';
  // enteredTitle = '';
  newPost = 'NO CONTENT';
  // @Output()
  // postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {

    if(form.invalid) {
      return
    }

    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
