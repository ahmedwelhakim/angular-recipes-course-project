import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from './../../store/app.reducer';
import * as AuthActions from './../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('loginForm') loginForm: NgForm;
  constructor(
    private route: Router,
    private store: Store<fromApp.AppState>
  ) { }
  errorMessage: string = null;
  isLoading = false;
  subscription: Subscription;
  ngOnInit(): void {
    this.subscription = this.store.select('auth').subscribe(userState => {
      this.isLoading = userState.loading;
      this.errorMessage = userState.error;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSubmit() {
    this.store.dispatch(AuthActions.loginStart({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }));

  }

}
