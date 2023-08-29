import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    // Form is valid, proceed with authentication
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Call your authentication service to log in
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('res', response);
        
        if (response.status == 'success') {
          console.log('Login successful', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.user);
        }
      }, (error) => {
        this.error = "Please Check the Credentails"
        
      });
  }
}
