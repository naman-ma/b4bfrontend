import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENV } from '../../../environments/environment';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

interface authResponse {
  status,
  payload: {
    access_token,
    user_data
  },
  messsage
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Subject for holding logged in after state 
   */
  public userSignedIn$: Subject<boolean> = new Subject();

  public userType: string;


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getToken() {
    const tokenName = this.router.url.indexOf('admin') !== -1 ? 'admin_access_token' : 'access_token';
    const token = localStorage.getItem(tokenName);
    return token ? `Bearer ${token}` : null;
  }

  register(request): Observable<any> {
    return this.http.post(ENV.USER_REGISTER, request);
  }

  login(request): Observable<any> {
    return this.http.post<authResponse>(ENV.USER_LOGIN, request);
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  hasRole(role: string) {
    if (this.isLoggedIn()) {
      return !!localStorage.getItem('access_token');
    }
    return false;
  }

  /**
   * forgot passsword API
   * @param params: { email }
   */
  forgotPassword(params: any): Observable<any> {
    return this.http.post<any>('auth/user/forget-password', params);
  }

  /**
   * reset passsword API
   * @param params: {token, password}
   */
  resetPassword(params: any): Observable<any> {
    return this.http.put<any>('auth/user/reset-password', params);
  }

  verifyAccount(data) {
    return this.http.post('auth/verify', data);
  }

  logout() {
    window.localStorage.clear();
    return !window.localStorage.length;
  }

  /**
   * Set user type in headers
   */
  isGuestUser() {
    this.userType = this.isLoggedIn() ? 'USER' : 'GUEST';
    localStorage.setItem('userType', btoa(this.userType));
    return this.isLoggedIn();
  }

  
  public get userData() {

    try {
      if (this.isLoggedIn()) {
        return JSON.parse(window.atob(localStorage.getItem('user_data')));
      }
    } catch (error) {
      console.log('error: userData in auth service', error);
      return {};
    }

  }

}
