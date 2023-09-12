import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }


  /**
   * Resolves geolocation of the current client browser
   * 
   * @return {Promise} [description]
   */
  geoLocation() {
    let requestUrl = `${window.location.protocol}//ip-api.com/json?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,query`;

    fetch(requestUrl)
      .then((response) => {
        let that = this;

        // Examine the text in the response
        response.json()
          .then(function (response) {
            response = JSON.stringify(response);

            // save this response in cookies in encoded form
            // const encodedUserMetas = btoa(response);
            that.cookieService.set('_locationData', response);

          });
      })
      .catch(function (error) {
        console.log('fetch error :', error);
      });
  }


  /**
   * user location meta details API
   */
  getUserLocationMeta(): Observable<any> {
    let dataToSend = {}, locationMeta = this.cookieService.get('_locationData');

    if (locationMeta) {
      locationMeta = JSON.parse(locationMeta);
      dataToSend['countryCode'] = locationMeta['countryCode'];
    } else {
      dataToSend['countryCode'] = 'IN';
    }

    return this.http.get<any>(`auth/user/user-meta/${btoa(dataToSend['countryCode'])}`);
  }

}
