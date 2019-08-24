import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost(postsPerPage: number, currentPage: number) {
    const queryParams =`?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, maxPosts: number, posts: any[]}>('http://localhost:3000/api/posts'+queryParams)
      .pipe(map((postData) => {
        return  { posts: postData.posts.map((post) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          }
        }),
        maxPosts: postData.maxPosts
      }
      }))
      .subscribe((transformedPost) => {
        this.posts = transformedPost.posts;
        this.postUpdated.next({posts: [...this.posts], postCount: transformedPost.maxPosts});
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  fetchPost(id: string) {
    return this.http.get<{post: {_id: string, title: string, content: string, imagePath: string}}>('http://localhost:3000/api/posts/'+id);
  }

  updatePost(id: string, title: string, content: string, image: File | string | Blob) {
    let postData: Post | FormData;
    if(typeof(image) === 'object') {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    }else {
        postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      }
    }

    this.http.put<{imagePath: string}>('http://localhost:3000/api/posts/'+id, postData)
    .subscribe(response => {
      this.router.navigate(["/"]);
      })
  }

  addPost(title: string, content: string, image: File){
    // const post: Post = {id: null, title: title, content: content};
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string): Observable {
    // this.http.delete('http://localhost:3000/api/posts/'+ postId)
    return this.http.delete("http://localhost:3000/api/posts/" + postId);
  }
}
