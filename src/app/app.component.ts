import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bookstore';
  isAdmin: boolean = false;
  isAuthor: boolean = false;
  isLoggedIn: boolean = false;
  
  constructor(private authService: AuthService){}

  ngOnInit(): void{
    this.isLoggedIn = this.authService.isLoggedIn();
    const user_role = this.authService.getUserRole();

    if (this.isLoggedIn) {
      // Check if the user has "admin" role
      this.isAdmin = user_role=='admin'? true : false;
      // Check if the user has "author" role
      this.isAuthor = user_role=='author'? true : false;
    }
  }

  logout(){
    const confirmation = confirm('Are You want to logout?')
    if (confirmation){
      this.authService.logOut()
    };
  }
}
