import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    token: null,
    error
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    error: null
  })),
  on(AuthActions.registerSuccess, (state, { token }) => ({
    ...state,
    token,
    error: null
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    token: null,
    error
  })),
  on(AuthActions.resetPasswordSuccess, (state, { message }) => ({
    ...state,
    message,
    error: null
  })),
  on(AuthActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    message: null,
    error
  }))
);
