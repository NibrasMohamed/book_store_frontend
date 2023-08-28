import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonResponse } from './shared/common-response';
import { Author } from './author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl = 'http://bookstore.local/api/authors'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<CommonResponse<Author[]>>{
    return this.http.get<CommonResponse<Author[]>>(this.apiUrl);
  }

  addAuthor(authorData: any): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, authorData);
  }

}
