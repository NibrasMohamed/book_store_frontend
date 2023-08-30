import { Component } from '@angular/core';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bookstore';
  
  constructor(private authService: AuthService){}

  logout(){
    const confirmation = confirm('Are You want to logout?')
    if (confirmation){
      this.authService.logOut()
    };
  }
}
