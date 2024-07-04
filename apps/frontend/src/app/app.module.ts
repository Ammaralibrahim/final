import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

import { routes } from './app.routes'; 
import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ResetComponent } from './component/reset/reset.component';
import { NewPasswordComponent } from './component/new-password/new-password.component';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './component/home/home.component'; // Include HomeComponent

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    NewPasswordComponent,
    HomeComponent // Include HomeComponent in declarations
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule, 
    FormsModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
