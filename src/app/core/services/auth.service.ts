import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest } from 'src/app/models/login-request';
import { User } from 'src/app/models/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  constructor(http: HttpClient,
    private router: Router
    ) {
      super(http, 'account')
  }
  error = new BehaviorSubject<string>(null);
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  private handleErrorAuth = (errorRes: any) => {
    let errorMessage = 'Unknown Error'
    if (!errorRes.error|| !errorRes.error.error) {
      this.error.next(errorMessage);
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'INVALID_AUTH':
        errorMessage = 'Username Or Password are not correct';
      break;
      case 'FAILED_LOGIN':
        break;
    }
    this.error.next(errorMessage);
    return throwError(errorMessage)
  };
  public login(loginDetails: LoginRequest){
    return this.postReqResp<LoginRequest, User>(
      'login.json',
      loginDetails
    ).pipe(
      tap(resData => {
        this.handleAuthentication(resData);
        }),
      catchError(this.handleErrorAuth)
  );
}

  autoLogin() {
    const userData: {
      username: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(userRes:User) {
    const expirationDate = new Date(new Date().getTime() + userRes.expirationIn * 1000);
    const user = new User(userRes.username, userRes.id, userRes.token, expirationDate);
    console.log(user);
    this.user.next(user);
    this.autoLogout(userRes.expirationIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}