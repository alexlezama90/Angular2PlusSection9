import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/post.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private service: PostsService) {

  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(
        response => {
          // console.log(response.json());
          this.posts = response.json();
        },
        error => {
          alert('An unexpected error ocurred.');
          console.log(error);
        });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value }

    this.service.createPost(post)
      .subscribe(
        response => {
          post['id'] = response.json().id;
          this.posts.splice(0, 0, post);
          console.log(response.json());
        },
        (error: Response) => {
          if(error.status === 400) {
            // this.form.setErrors(error.json());
          } 
          else{
            alert('An unexpected error ocurred.');
            console.log(error);
          }

        });

    input.value = '';
  }

  updatePost(post) {
    //we use put to update the entire object
    // this.http.put(this.url, JSON.stringify(post));
    //we use patch when we want to update just some properties of an object.
    this.service.updatePost(post.id)
      .subscribe(
        response => {
          console.log(response.json());
        },
        error => {
          alert('An unexpected error ocurred.');
          console.log(error);
        });
  }

  deletePost(post) {
    this.service.deletePost(345) //post.id
      .subscribe(
        response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error: Response) => {
          if(error.status === 404)
            alert('This post has already been deleted.');
          else{
            alert('An unexpected error ocurred.');
            console.log(error);
          }
        });
  }

  // deletePost(post) {
  //   this.service.deletePost(15000)
  //     .subscribe((response: Object) => {
  //       let index = this.posts.indexOf(post);
  //       if (!response.hasOwnProperty(post)) {
  //         alert('Post does not exist')
  //         console.error(response);
  //       }
  //     },
  //     (error) => {
  //       alert('Unexpected error occured.');
  //       console.log(error)
  //     })
  // }
}
