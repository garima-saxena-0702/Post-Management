import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListner().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }
  onLogin(loginForm: NgForm) {
    if(loginForm.invalid){
      return
    }
    this.authService.loginUser(loginForm.value.email, loginForm.value.password)
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe()
  }

}
