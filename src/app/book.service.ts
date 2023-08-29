import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from './shared/common-response';
import { Observable } from 'rxjs';
import { Book } from './book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = environment.apiUrl+'books';

  constructor(private http: HttpClient) { }

  getBooks(search: string): Observable<CommonResponse<Book[]>>{
    return this.http.get<CommonResponse<Book[]>>(this.apiUrl+'?search='+search);
  }

  addBook(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData);
  }
}
