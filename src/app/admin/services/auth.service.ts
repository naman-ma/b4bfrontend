import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(request) {
    return this.http.post(`auth/user/login`, request);
  }

  isLoggedIn() {
    return !!localStorage.getItem('admin_access_token');
  }

  hasRole(role: string) {

    if (!this.isLoggedIn()) {
      return false;
    }

    let token = localStorage.getItem('admin_access_token').split('.');
    token = JSON.parse(atob(token[1]));

    if (token['role'] && token['role'].includes(role)) {
      return true;
    }

    return false;
  }

  public get loggedInUserData() {
    try {
      if (localStorage.getItem('admin_access_token')) {
        let token = localStorage.getItem('admin_access_token').split('.');
        token = JSON.parse(atob(token[1]));
        return token
      }
    } catch (error) {
      console.log('error: loggedInUserData in admin : auth service', error);
      return {};
    }
  }

}
