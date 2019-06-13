import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  private url = 'http://jsonplaceholder.typicode.com/posts'

  constructor(private http: Http) {
   
   }

  ngOnInit() {
    this.http.get(this.url)
    .subscribe(response => {
      // console.log(response.json());
      this.posts = response.json();
    });
  }

  createPost(input: HTMLInputElement){
    let post = {title: input.value}

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response=> {
      post['id'] = response.json().id;
      this.posts.splice(0, 0, post);
      console.log(response.json());
    });

    input.value='';
  }

  updatePost(post){
    //we use put to update the entire object
    // this.http.put(this.url, JSON.stringify(post));
    //we use patch when we want to update just some properties of an object.
    this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
      .subscribe(response => {
      console.log(response.json());
    });
  }

  deletePost(post){
    this.http.delete(this.url + '/' + post.id)
      .subscribe(response=> {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      })
  }

}
