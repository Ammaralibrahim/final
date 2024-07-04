import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const register = createAction(
  '[Auth] Register',
  props<{ email: string; password: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ token: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ email: string; verificationCode: string; newPassword: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success',
  props<{ message: string }>()
);

export const resetPasswordFailure = createAction(
  '[Auth] Reset Password Failure',
  props<{ error: string }>()
);
export const sendVerificationCode = createAction(
  '[Reset Component] Send Verification Code',
  props<{ email: string }>()
);

export const sendVerificationCodeSuccess = createAction(
  '[Auth API] Send Verification Code Success',
  props<{ message: string }>()
);

export const sendVerificationCodeFailure = createAction(
  '[Auth API] Send Verification Code Failure',
  props<{ error: string }>()
);
