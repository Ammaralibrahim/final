import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent {
  email = '';
  verificationCode = '';
  newPassword = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const body = {
      email: this.email,
      verificationCode: this.verificationCode,
      newPassword: this.newPassword
    };

    this.http.put('http://localhost:3000/auth/verify-and-reset-password', body).subscribe(
      (response: any) => {
        this.message = response.message;
        this.router.navigate(['/login']);
      },
      (error) => {
        this.message = error.error.message || 'Password reset failed';
      }
    );
  }
}
