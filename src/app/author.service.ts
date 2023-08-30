import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonResponse } from './shared/common-response';
import { Author } from './author';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl = environment.apiUrl+'authors';

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<CommonResponse<Author[]>>{
    return this.http.get<CommonResponse<Author[]>>(this.apiUrl);
  }

  addAuthor(authorData: any): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, authorData);
  }

  updateAuthorStatus(id: number, status:boolean){
    return this.http.post(this.apiUrl+`/change-status/${id}`, {status: status});
  }

}
