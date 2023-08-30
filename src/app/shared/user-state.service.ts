import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  user: any = {};
  
  constructor() { }

  setUser(user: any){
    this.user = user;
  }

  getUser(){
    console.log(this.user);
    
    return this.user;
  }

  clearUser(): void {
    this.user = null;
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }
}
