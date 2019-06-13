import { Component, OnInit } from '@angular/core';
import { AuthorsService } from './authors.service';

@Component({
  selector: 'app-autors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: string[];

  constructor(private service: AuthorsService) { }

  ngOnInit() {
    this.authors = this.service.getAuthors();
  }

  getTitle(){
    return this.authors.length + " Authors";
  }

}
