import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  title = 'bookstore';
  isAdmin: boolean = false;
  isAuthor: boolean = false;
  isLoggedIn: boolean = false;
  
  constructor(private authService: AuthService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void{
    this.isLoggedIn = this.authService.isLoggedIn();
    const user_role = this.authService.getUserRole();

    if (this.isLoggedIn) {
      // Check if the user has "admin" role
      this.isAdmin = user_role=='admin'? true : false;
      // Check if the user has "author" role
      this.isAuthor = user_role=='author'? true : false;
    }else{
      this.isAdmin = false;
      this.isAuthor = false;
    }

    this.cdr.detectChanges();
  }

  logout(){
    const confirmation = confirm('Are You want to logout?')
    if (confirmation){
      this.authService.logOut()
    };
  }
}
