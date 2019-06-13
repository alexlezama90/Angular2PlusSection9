import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  constructor(http: Http) {
    http.get('http://jsonplaceholder.typicode.com/posts')
      .subscribe(response => {
        // console.log(response.json());
        this.posts = response.json();
      });
   }

  ngOnInit() {
  }

}
