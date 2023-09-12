import { Component, OnInit } from '@angular/core';
import { PlatformService } from './admin/services/platform.service';
import { LanguageService } from './front/services/language.service';
import { Response } from './front/interfaces/response';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'body',
  template: `<router-outlet></router-outlet>
            <ngx-spinner></ngx-spinner>`
})
export class AppComponent implements OnInit {

  constructor(
    private platformService: PlatformService,
    private languageService: LanguageService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {

    // loaded settings
    this.platformService.getPlatformSettings();

    // to get current user location details
    this.languageService.geoLocation();

    // get user location meta details(currrency, language etc)
    this.languageService.getUserLocationMeta().subscribe((response: Response) => {
      if (response['success']) {
        this.cookieService.set('_userlocationMeta', JSON.stringify(response['payload']));
      }
    });

  }

}

// <ngx-spinner bdColor="rgba(51,51,51,0.8)" size="medium" color="#fff" fullScreen="true" type="ball-clip-rotate-multiple">
//     <p style="font-size: 20px; color: white">Loading...</p>
// </ngx-spinner>