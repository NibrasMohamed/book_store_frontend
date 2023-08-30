import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Role } from '../interfaces/role';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  private apiUrl = environment.apiUrl; 
  public roles: Role[] = [];

  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private http: HttpClient, private router: Router, private commonService: CommonService) { }

  ngOnInit():void {
    this.getRoles();
  }

  onSubmit(): void {
    // Prepare the registration data
    const registrationData = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
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

  getRoles(){
      this.commonService.getRoles().subscribe((response)=>{
        if (response.status == 'success') {
          this.roles = response.data
        }
      });
  }
}
