import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserStateService } from '../shared/user-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private userStateService: UserStateService) {
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
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.role[0].name);
          this.userStateService.setUser(response.data.user);
          this.authService.emitLoginStatusChange(true)
          this.router.navigate(['home']);
        }
      }, (error) => {
        this.error = "Please Check the Credentails"
        
      });
  }
}
