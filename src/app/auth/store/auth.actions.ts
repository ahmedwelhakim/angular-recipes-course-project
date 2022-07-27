import { createAction, props } from '@ngrx/store';

interface User {
  id: string,
  email: string,
  token: string,
  tokenExpirationDate: Date
}


export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ email: string, password: string }>()
);
export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{ email: string, password: string }>()
);
export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<User>()
);
export const authFail = createAction(
  '[Auth] Auth Fail',
  props<{ error: string }>()
);
export const logout = createAction(
  '[Auth] Log Out'
);
export const autoLogin = createAction(
  '[Auth] Auto Login'
);
