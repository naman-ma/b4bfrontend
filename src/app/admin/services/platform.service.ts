import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Interface for matching service response.
 */
interface Response {
  message?: string;
  success?: boolean;
  payload?: any;
  status?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  /**
   * Base url for api's
   */
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  /**
   * returns all platforms
   */
  getAllPlatforms(): Observable<any> {
    return this.http.get(`superAdmin/allPlatforms`);
  }

  updatePlatform(data): Observable<any> {
    return this.http.put(`superAdmin/updatePlatformStatus`, data)
      .pipe(map(this._respond));
  }

  getPlatformSettings() {
    // load the settings from local storage
    let settings = localStorage.getItem('settings');

    if (settings) {
      // decode the loaded settings
      settings = atob(settings);
      settings = JSON.parse(settings);
      return settings
    } else {
      this.fetchPlatformSettings()
    }
  }

  fetchPlatformSettings() {
    // fetch the settings from the backend
    return this.http.get(`admin/platform/allSettings`)
      .subscribe((response) => {
        if (response && response['payload']) {
          response['payload'] = JSON.stringify(response['payload']);
          const encodedSettings = btoa(response['payload']);
          localStorage.setItem("settings", encodedSettings);
          return response['payload']
        }
      });
  }

  addPlatformSetting(data): Observable<any> {
    return this.http.post(`admin/platform/addSetting`, data)
      .pipe(map(this._respond));
  }

  updatePlatformSetting(data): Observable<any> {
    return this.http.put(`admin/platform/updateSetting`, data)
      .pipe(map(this._respond));
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
