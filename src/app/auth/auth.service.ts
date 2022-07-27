import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  expirationTimer: any;
  constructor(private store: Store<fromApp.AppState>) { }

  setLogoutTimer(expirateTime_ms: number) {
    this.expirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout());
    }, expirateTime_ms)
  }
  clearLogoutTimer() {
    clearTimeout(this.expirationTimer);
  }

}
