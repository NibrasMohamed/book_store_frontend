import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from './shared/common-response';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://bookstore.local/api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<CommonResponse<Book[]>>{
    return this.http.get<CommonResponse<Book[]>>(this.apiUrl);
  }

  addBook(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData);
  }
}
