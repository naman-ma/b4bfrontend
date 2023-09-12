import { Component, OnInit } from '@angular/core';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

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

}
