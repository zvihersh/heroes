import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string = null;

  private routeSub: Subscription;
  private storeSub: Subscription;
  authForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
    this.initForm();
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const username = this.authForm.value.username;
    const password = this.authForm.value.password;


    this.isLoading = true;

    const authObs: Observable<User> = this.authService.login({username, password});

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/all-heroes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.initForm();
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let usernameAuth = '';
    let passwordAuth = '';
    this.authForm = new FormGroup({
      username: new FormControl(usernameAuth , [Validators.required, Validators.email]),
      password: new FormControl(passwordAuth, [Validators.required, Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W)(?=^.{8,}).*/)])
    })
  }
}