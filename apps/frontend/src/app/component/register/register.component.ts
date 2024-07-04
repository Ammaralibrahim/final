import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth.state';
import * as AuthActions from '../../store/auth.actions';
import { Observable } from 'rxjs'; // İthalat eklendi

import { selectAuthError } from '../../store/auth.selectors';
import { SweetalertService } from '../../sweetalert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  error$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store<AuthState>, private sweetAlertService: SweetalertService) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
    this.error$ = this.store.select(selectAuthError);
  }

  submit() {
    const { email, password } = this.form.value;
    this.store.dispatch(AuthActions.register({ email, password }));
  }
}
