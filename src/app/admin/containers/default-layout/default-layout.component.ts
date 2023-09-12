import { Component } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {
  
  public backendUrl = environment.backendUrl + 'uploads';
  public sidebarMinimized = false;
  public navItems = navItems;
  public loggedInUserDetails;
  public userDetails;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.getUserDetails();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  /**
   * @returns {Object} userdetails
   */
  getUserDetails() {
    this.loggedInUserDetails = this.authService.loggedInUserData;
    if (this.loggedInUserDetails) {
      this.userService.getUserDetails(this.loggedInUserDetails['uid']).subscribe((response: Response) => {
        if (response && response['success'] && response['payload']) {
          this.userDetails = response['payload'];
        }
      });
    }
  }

}
