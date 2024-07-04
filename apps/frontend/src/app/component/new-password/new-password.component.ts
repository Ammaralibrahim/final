// new-password.component.ts

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth.state';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthMessage, selectAuthError } from '../../store/auth.selectors';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent {
  email = '';
  verificationCode = '';
  newPassword = '';
  message$: Observable<string | null>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.message$ = this.store.select(selectAuthMessage);
    this.error$ = this.store.select(selectAuthError);
  }

  onSubmit() {
    this.store.dispatch(AuthActions.resetPassword({
      email: this.email,
      verificationCode: this.verificationCode,
      newPassword: this.newPassword
    }));
  }
}
