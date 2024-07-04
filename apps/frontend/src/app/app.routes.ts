import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { ResetComponent } from './component/reset/reset.component';
import { NewPasswordComponent } from './component/new-password/new-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'reset', component: ResetComponent },
];
