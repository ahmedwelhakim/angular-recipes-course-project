import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('loginForm') loginForm:NgForm;
  constructor(private authService:AuthService,private route:Router) { }
  errorMessage:string = null;
  isLoading = false;
  ngOnInit(): void {
  }
  ngOnDestroy(): void {

  }
  onSubmit(){
    this.isLoading = true;
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
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
