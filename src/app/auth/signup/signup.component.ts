import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  @ViewChild('signupForm') signUpForm:NgForm;
  constructor(private authService:AuthService,private route:Router) { }
  errorMessage:string = null;
  isLoading = false;

  ngOnInit(): void {
  }
  ngOnDestroy(): void {

  }
  onSubmit(){
    this.isLoading = true;
    this.authService.signUp(this.signUpForm.value.email,this.signUpForm.value.password).subscribe({
      next:(user)=>{
        this.isLoading = false;
        this.route.navigate(['/recipes'])
      },
      error:(err)=>{
      this.isLoading = false;
      this.errorMessage = err;
    }})
  }

}
