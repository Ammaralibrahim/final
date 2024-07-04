import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { SweetalertService } from '../sweetalert.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sweetAlertService: SweetalertService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(data => AuthActions.loginSuccess({ token: data.token })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(action => {
          localStorage.setItem('token', action.token);
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(action =>
        this.authService.register(action.email, action.password).pipe(
          map(data => AuthActions.registerSuccess({ token: data.token })),
          catchError(error => of(AuthActions.registerFailure({ error: error.message })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(action => {
          localStorage.setItem('token', action.token);
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      mergeMap(action =>
        this.authService.resetPassword(action.email, action.verificationCode, action.newPassword).pipe(
          map((response: any) => {
            this.sweetAlertService.showSuccess('Password reset successful! You can now login with your new password.');
            this.router.navigate(['/login']);
            return AuthActions.resetPasswordSuccess({ message: response.message });
          }),
          catchError(error => {
            this.sweetAlertService.showError('Password reset failed. Please try again.');
            return of(AuthActions.resetPasswordFailure({ error: error.error.message || 'Password reset failed' }));
          })
        )
      )
    )
  );
}
