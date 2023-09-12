import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Response } from '../interfaces/response';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  /**
   * 
   * @param userUid : user uid string
   */
  getUserDetails(userUid: string): Observable<any> {
    return this.http.get(`admin/user/${btoa(userUid)}`);
  }

  updateUser(params: any): Observable<any> {
    return this.http.put(`admin/user/update`, params);
  }

  /**
   * Fetches users 
   * 
   * @param {object} params
   */
  getAllUsers(params: object): Observable<any> {
    return this.http.get(`admin/user/allUsers`, {
      params: {
        data: JSON.stringify(params)
      }
    });
  }

  /**
   * 
   * @param data {Object}
   */
  sendWarningEmail(data): Observable<any> {
    return this.http.post(`admin/user/warning-email`, data);
  }

  /**
   * returns total users count
   */
  getAllPlatformUsersCount(): Observable<any> {
    return this.http.get(`admin/user/allUsersCount`);
  }

  /**
   * Adapter for handling errors via toastr for the service response.
   *
   * @param response Response
   * @returns response Response
   */
  _respond = (response: Response): Response => {
    if (!response.success) {
      this.toastr.error(response.message || 'Something went wrong!');
    } else if (response.success && response.message) {
      this.toastr.success(response.message);
    }
    return response;
  }

}
