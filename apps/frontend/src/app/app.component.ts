// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // Ana bileşenin seçici adı
  templateUrl: './app.component.html', // HTML şablonunun dosya yolu
  styleUrls: ['./app.component.css'] // CSS dosyalarının dosya yolları
})
export class AppComponent {
  title = 'YourApp'; // Uygulama başlığı
}
