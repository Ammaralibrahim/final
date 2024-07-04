import { Component } from '@angular/core';
import { AuthService } from '../../auth.service'; // AuthService dosya yoluna göre ayarlanmalı
import { CommonModule } from '@angular/common'; // CommonModule import edildi

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule], // CommonModule buraya eklendi
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(public authService: AuthService) {} // AuthService buraya göre inject edildi

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
