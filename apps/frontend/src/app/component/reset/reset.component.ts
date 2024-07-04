import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SweetalertService } from '../../sweetalert.service'; // SweetalertService'ı import edin

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  email: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router, private sweetAlertService: SweetalertService) {}

  onSubmit() {
    this.http.put('http://localhost:3000/auth/send-verification-code', { email: this.email })
      .subscribe(
        (response: any) => {
          this.sweetAlertService.showSuccess(response.message);
          this.message = response.message;
        this.router.navigate(['/new-password']);

        },
        (error) => {
          console.error('Şifre sıfırlama başarısız', error);
          this.sweetAlertService.showError(error.error.message || 'Şifre sıfırlama başarısız');
        }
      );
  }
}
