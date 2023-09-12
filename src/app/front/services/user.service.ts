import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * 
   * @param userUid : user uid string
   */
  getUserDetails(userUid: string): Observable<any> {
    return this.http.get(`admin/user/${btoa(userUid)}`);
  }

}
