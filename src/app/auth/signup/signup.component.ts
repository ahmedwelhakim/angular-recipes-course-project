import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import * as fromApp from './../../store/app.reducer';
import * as AuthActions from './../store/auth.actions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  @ViewChild('signupForm') signUpForm: NgForm;
  constructor(
    private authService: AuthService,
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
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSubmit() {
    this.isLoading = true;
    this.store.dispatch
    this.store.dispatch(AuthActions.signupStart({
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }));
  }

}
