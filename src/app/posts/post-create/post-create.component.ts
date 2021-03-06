import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit, OnDestroy {

  newPost = 'NO CONTENT';
  post: Post;
  private mode = 'create';
  private postId: string;
  isLoading: boolean = false;
  form: FormGroup;
  imagePreview: string;
  private authStatusSub: Subscription

  constructor(public postService: PostService, public route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListner().subscribe(authStatus => {
      this.isLoading  = false;
    })
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.fetchPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData.post._id, title: postData.post.title, content: postData.post.content, imagePath: postData.post.imagePath, creator: null};
          this.form.setValue({
            'title': this.post.title, 'content': this.post.content, 'image': this.post.imagePath
          });
        });
      }
      else {
        this.mode = 'create';
      }
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onSavePost() {
    if(this.form.invalid) {
      return
    }
    this.isLoading = true;
    if(this.mode === 'create')
    this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    else
    this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const  reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
