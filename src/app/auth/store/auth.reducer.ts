import { createReducer, on } from '@ngrx/store';
import { User } from './../auth.model';
import * as AuthActions from './auth.actions';
export interface State {
  user: User,
  loading: boolean,
  error: string
}
const initialState: State = {
  user: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(initialState,
  on(AuthActions.loginStart,
    (state) => ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(AuthActions.signupStart,
    (state) => ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(AuthActions.authSuccess,
    (state, { email, id, token, tokenExpirationDate }) => ({
      ...state,
      user: new User(id, email, token, tokenExpirationDate),
      loading: false,
      error: null
    })
  ),
  on(AuthActions.authFail,
    (state, { error }) => ({
      ...state,
      user: null,
      loading: false,
      error: error
    })
  ),
  on(AuthActions.logout,
    (state) => ({
      ...state,
      user: null,
      loading: false,
      error: null
    })
  ),
  on(AuthActions.autoLogin,
    (state) => ({
      ...state
    })
  ),
)
