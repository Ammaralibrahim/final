import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth.state';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthError } from '../../store/auth.selectors';
import { SweetalertService } from '../../sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  error$: Observable<string | null>;

  constructor(private fb: FormBuilder, 
              private store: Store<AuthState>,
              private sweetAlertService: SweetalertService) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
    this.error$ = this.store.select(selectAuthError);
  }

  submit() {
    const { email, password } = this.form.value;
    this.store.dispatch(AuthActions.login({ email, password }));
  }
}
