import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  email = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const body = { email: this.email };

    this.http.put('http://localhost:3000/auth/send-verification-code', body).subscribe(
      (response: any) => {
        this.message = response.message;
        this.router.navigate(['/new-password']);
      },
      (error) => {
        this.message = error.error.message || 'Failed to send verification code';
      }
    );
  }
}
