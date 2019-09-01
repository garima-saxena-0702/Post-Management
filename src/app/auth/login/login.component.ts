import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  onLogin(loginForm: NgForm) {
    if(loginForm.invalid){
      return
    }
    this.authService.loginUser(loginForm.value.email, loginForm.value.password)
  }

}
