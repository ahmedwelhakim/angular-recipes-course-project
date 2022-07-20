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

  ngOnInit(): void {
  }
  ngOnDestroy(): void {

  }
  onSubmit(){
    this.authService.signUp(this.signUpForm.value.email,this.signUpForm.value.password).subscribe({
      next:(user)=>{
        this.route.navigate(['/recipes'])
      },
      error:(err)=>{
      this.errorMessage = err;
    }})
  }

}
