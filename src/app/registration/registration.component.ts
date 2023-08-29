import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  private apiUrl = environment.apiUrl; 
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(): void {
    // Prepare the registration data
    const registrationData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    // Make an HTTP POST request to your Laravel registration endpoint
    this.http.post( this.apiUrl+'register', registrationData).subscribe(
      (response: any) => {
        if (response.status == 'success') {
          console.log('Registration successful', response);
          this.router.navigate(['/login']); 
        }
      });
  }
}
