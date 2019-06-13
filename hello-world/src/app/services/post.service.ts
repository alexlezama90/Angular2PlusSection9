import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url = 'http://jsonplaceholder.typicode.com/posts'
  // private url = 'http://abcdjsonplaceholder.typicode.com/posts' //invalid

  constructor(private http: Http) { }

  getPosts(){
    return this.http.get(this.url);
  }

  createPost(post){
    return this.http.post(this.url, JSON.stringify(post));
  }

  updatePost(id){
    return this.http.patch(this.url + '/' + id, JSON.stringify({isRead: true}));
  }

  deletePost(id){
    return this.http.delete(this.url + '/' + id).pipe();
  }


}
