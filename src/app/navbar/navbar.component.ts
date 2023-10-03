import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  title = 'bookstore';
  isAdmin: boolean = false;
  isAuthor: boolean = false;
  isLoggedIn: boolean = false;
  private loginStatusSubscription: Subscription;

  constructor(private authService: AuthService) {
    // Subscribe to login status changes
    this.loginStatusSubscription = this.authService.getLoginStatus().subscribe(status => {
      console.log('[login status sub]');
      
      this.isLoggedIn = status;
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
}
