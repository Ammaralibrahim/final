import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Backend API URL

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }
  resetPassword(email: string, verificationCode: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/verify-and-reset-password`, { email, verificationCode, newPassword });
  }
}
