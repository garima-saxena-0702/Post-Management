import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  // @Input()
  posts: Post[] = [];
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  isLoading: boolean = false;
  totalPost:number = 10;
  postsPerPage:number = 2;
  currentPage: number = 1;
  pageSizeOption = [1,2,5,10];
  isUserAuthenticated: boolean;
  userId:string;

  constructor(public postsService: PostService, public authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPost(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUSerId();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPost = postData.postCount
        this.posts = postData.posts;
      })
      this.isUserAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListner()
        .subscribe(authentication => {
          this.isUserAuthenticated = authentication;
          this.userId = this.authService.getUSerId();
        })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  deletePost(id: string) {
    this.postsService.deletePost(id).subscribe(() => {
      this.postsService.getPost(this.postsPerPage, this.currentPage);
    })
  }

  onChangedPage(event: PageEvent) {
    this.isLoading = true;
    this.currentPage = event.pageIndex + 1;
    this.postsPerPage = event.pageSize;
    this.postsService.getPost(this.postsPerPage, this.currentPage);
  }


}
