import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild("OpenWhoAreYouModal", { static: false }) OpenWhoAreYouModal: any;

  /**
   * strores logged in state
   */
  public isLoggedIn: boolean = false;
  public userRole: string;

  public loggedInUserDetails;
  public backendUrl: string = environment.backendUrl + 'uploads';

  constructor(
    private socketService: SocketService,
    private authService: AuthService,
    private router: Router,
  ) {

    this.isLoggedIn = this.authService.isLoggedIn();

    // subscribe to subject to listen to login event response
    this.authService.userSignedIn$.subscribe((params: boolean) => {
      this.isLoggedIn = params;
      // this.userRole = this.localStorageService.getData('userRole');
    });

    this.loggedInUserDetails = this.authService.userData;

  }

  ngOnInit() {
  }

  /**
   * opens who-are-you modal
   */
  openModalPopup() {
    this.OpenWhoAreYouModal.openModal()
    // .result.then((result) => {
    //   console.log('47--result: ', result);
    //   if (result && result.success) {
    //   }
    // }, (reason) => {
    //   console.log('51--reason: ', reason);
    // });
  }

}
