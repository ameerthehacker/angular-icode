import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: 'ic-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  loginForm: FormGroup;
  error: false;
  errors: string[];

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSubmit() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;    
    this.authService.authenticate(username, password).subscribe((response: any) => {
      console.log(response);
      if(response.error){
        this.error = response.error;
        this.errors = response.msg;
      }
      else{
        // Create session for the user
        this.authService.createSession(response);
      }
    });
  }

}
