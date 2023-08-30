import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonResponse } from './common-response';
import { Role } from '../interfaces/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRoles(): Observable<CommonResponse<Role[]>>{
   return this.http.get<CommonResponse<Role[]>>(`${this.apiUrl}get-roles`);
  }
}
