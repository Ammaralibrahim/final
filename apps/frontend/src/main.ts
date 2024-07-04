// main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // AppModule'i doğru şekilde belirtin

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
