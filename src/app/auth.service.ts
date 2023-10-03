import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserStateService } from './shared/user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private user: any;
  protected logedIn = false;
  private loginStatusSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private userStateService: UserStateService) { }

  login(email: string, password: string) {
    const loginData = {
      email: email,
      password: password
    };

    return this.http.post<any>(`${this.apiUrl}login`, loginData);
  }

  isLoggedIn(){
    this.logedIn = localStorage.getItem('token')!=null;
    return this.logedIn;
  }

  logOut(){
    this.http.get<any>(`${this.apiUrl}logout`, {}).subscribe();
    localStorage.clear();
    this.router.navigate(['login']);
  }

  setUSer(user: any){
    console.log('[user]', user);
    
    this.user = user;
    console.log('[this.user]', this.user);
    
  }

  getUser(): any{
    if (!this.user) {
      const userJson = this.userStateService.getUser()
      if (userJson != null	) {
        this.user = userJson
      }
    }
    return this.user
  }

  getUserRole(): any{
    return localStorage.getItem('role');
  }

  emitLoginStatusChange(status: boolean) {
    this.loginStatusSubject.next(status);
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatusSubject.asObservable();
  }
}
