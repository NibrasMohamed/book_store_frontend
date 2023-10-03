import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UserStateService } from '../shared/user-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy, OnInit {
  title = 'bookstore';
  isAdmin: boolean = false;
  isAuthor: boolean = false;
  isLoggedIn: boolean = false;
  private loginStatusSubscription: Subscription;

  constructor(private authService: AuthService, private userStateService: UserStateService) {
    // Subscribe to login status changes
    this.loginStatusSubscription = this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
      // if (!this.isLoggedIn) {
      //   this.isLoggedIn = this.checkRefreshAndSetUser()
      // }
      if (this.isLoggedIn) {
        // Update user roles when logged in
        const userRole = this.authService.getUserRole();
        this.isAdmin = userRole === 'admin';
        this.isAuthor = userRole === 'author';
      } else {
        this.isAdmin = false;
        this.isAuthor = false;
      }
    });
  }

  ngOnInit(){
    this.checkRefreshAndSetUser();
  }
  
  ngOnDestroy(): void {
    this.loginStatusSubscription.unsubscribe();
  }

  logout() {
    const confirmation = confirm('Are You want to logout?')
    if (confirmation) {
      this.authService.logOut()
      this.authService.emitLoginStatusChange(false)
    };
  }

  checkRefreshAndSetUser(){
    var user = this.userStateService.getUser();
    
    if (!user) {
      return false;
    }else{
      this.authService.emitLoginStatusChange(true);
      return true;
    }
  }
}
