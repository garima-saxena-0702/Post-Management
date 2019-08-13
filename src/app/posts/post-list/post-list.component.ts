import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  // @Input()
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading: boolean = false;

  constructor(public postsService: PostService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPost();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  deletePost(id: string) {
    this.postsService.deletePost(id);
  }


}
