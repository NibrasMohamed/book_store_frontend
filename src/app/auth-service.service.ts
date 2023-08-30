import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private user: any;


  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const loginData = {
      email: email,
      password: password
    };

    return this.http.post<any>(`${this.apiUrl}login`, loginData);
  }

  isLoggedIn(){
    var isLoggedIn = localStorage.getItem('token')!=null;
    return isLoggedIn;
  }

  logOut(){
    this.http.get<any>(`${this.apiUrl}logout`, {}).subscribe();
    localStorage.clear();
    this.router.navigate(['login']);
  }

  setUSer(user: any){
    this.user = user;
  }

  getUser(): any{
    return this.user
  }
}
