import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  logout() {
    localStorage.removeItem('token');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    window.location.reload();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }
}
