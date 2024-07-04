import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private router: Router, private http: HttpClient) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const tokenExpirationDate = this.getTokenExpirationDate(token);
    const isExpired = tokenExpirationDate ? tokenExpirationDate < new Date() : true;

    if (isExpired) {
      this.logout();
      return false;
    }

    this.startTokenExpirationTimer(tokenExpirationDate!);
    return true;
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (!decoded.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  private startTokenExpirationTimer(expirationDate: Date) {
    const currentTime = new Date().getTime();
    const expirationTime = expirationDate.getTime();
    const timeout = expirationTime - currentTime;

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      this.router.navigate(['/login']);
    }, timeout);
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    return of(null);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }
  
  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password });
  }
  
  resetPassword(email: string, verificationCode: string, newPassword: string): Observable<any> {
    const body = {
      email,
      verificationCode,
      newPassword
    };
    return this.http.put<any>('http://localhost:3000/auth/verify-and-reset-password', body);
  }

  sendVerificationCode(email: string): Observable<any> {
    return this.http.put<any>('http://localhost:3000/auth/send-verification-code', { email });
  }

}
