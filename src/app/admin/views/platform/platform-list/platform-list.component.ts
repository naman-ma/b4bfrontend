import { Component, OnInit } from '@angular/core';
import { PlatformService } from 'src/app/admin/services/platform.service';

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.scss']
})
export class PlatformListComponent implements OnInit {

  /**
   * Container to hold all platforms
   * @type {Array}
   */
  public platforms: any[] = [];

  constructor(
    private platformService: PlatformService
  ) { }

  ngOnInit() {
    this.getAllPlatforms();
  }

  /**
   * Fetches all platforms for the super admin user.
   */
  getAllPlatforms() {
    this.platformService.getAllPlatforms()
      .subscribe((response) => {
        if (response['success'] && response['payload']) {
          this.platforms = response['payload']
        }
      }, (error) => {
        console.log('error: ', error);
      });
  }

  /**
   * Changes status of the platform
   * 
   * @param {string}  id   
   * @param {number} flag 
   */
  status(id: string, flag: number) {
    return this.platformService.updatePlatform({
      flag,
      id
    }).subscribe((response) => {
      if (response['success'] && response['payload']) {
        this.platforms.map(platform => {
          if (platform.uid === id) {
            platform.status = response['payload']['status'];
          }
          return platform;
        });
      }
    });
  }

}
