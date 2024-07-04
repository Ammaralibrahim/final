import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  standalone: true,
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
  imports: [FormsModule, HttpClientModule, CommonModule]
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

// Uygulamayı başlatma
bootstrapApplication(ResetComponent, {
  providers: [
    provideHttpClient(),
  ]
}).catch(err => console.error(err));
