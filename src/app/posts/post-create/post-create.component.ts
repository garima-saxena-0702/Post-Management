import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  newPost = 'NO CONTENT';
  post: Post;
  private mode = 'create';
  private postId: string;
  isLoading: boolean = false;

  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.fetchPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData.post._id, title: postData.post.title, content: postData.post.content};
        });
      }
      else {
        this.mode = 'create';
      }
    });
  }

  onSavePost(form: NgForm) {

    if(form.invalid) {
      return
    }
    this.isLoading = true;
    if(this.mode === 'create')
    this.postService.addPost(form.value.title, form.value.content);
    else
    this.postService.updatePost(this.postId, form.value.title, form.value.content);
    form.resetForm();
  }

}
