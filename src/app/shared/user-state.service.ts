import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  user: any = {};
  
  constructor() { }

  setUser(user: any){
    const userJSON = JSON.stringify(user);
    localStorage.setItem('user', userJSON);
    this.user = user;
  }

  getUser(): any {
    const userJSON = localStorage.getItem('user');
    
    if (userJSON) {
      console.log('[get user]');
      return JSON.parse(userJSON);
    } else {
        return null;
    }
}

  clearUser(): void {
    this.user = null;
  }

  isLoggedIn(): boolean {
    const user = this.getUser();
    if (user != null) {
      return true;
    }else if(this.user){
      return true;
    }else{
      return false;
    }
  }
}
