import { Component, Injectable, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { AuthorService } from '../author.service';
import { CommonResponse } from '../shared/common-response';
import { Author } from '../author';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class AuthorListComponent {
  authors: Author[] = [];

  constructor(private authorService: AuthorService){}
  
  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(){
    
    this.authorService.getAuthors().subscribe((data)=>{
      if (data.status == 'success') {
        this.authors = data.data;
      }
    });
  }

}
