import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/front/services/auth.service';
import { UserService } from 'src/app/admin/services/user.service';
import { environment } from 'src/environments/environment';
import { Lightbox } from 'ngx-lightbox';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  public loggedInUserDetails;
  public userDetails;
  public backendUrl: string = environment.backendUrl + 'uploads';
  public _albums: any = [];
  public newProfilePicture;
  public profilePictureToUpdate;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private _lightbox: Lightbox,
    private toastr: ToastrService
  ) {
    this.loggedInUserDetails = this.authService.userData;
    this.getUserDetails();
  }

  ngOnInit() {
  }

  /**
   * @returns {Object} userdetails
   */
  getUserDetails() {
    if (this.loggedInUserDetails) {
      this.userService.getUserDetails(this.loggedInUserDetails['uid']).subscribe((response: Response) => {
        if (response && response['success'] && response['payload']) {
          this.userDetails = response['payload'];
        }
      });
    }
  }

  /**
   * open lightbox
   * @param index 
   */
  openProfilePic(): void {
    // open lightbox
    if (this.userDetails && this.userDetails.profile_pic) {
      const images = this.backendUrl + this.userDetails.profile_pic;
      if (images) {
        this._albums = [{
          src: images,
          caption: 'Image ' + this.userDetails.profile_pic.split('/')[this.userDetails.profile_pic.split('/').length - 1],
          thumb: images
        }];
        this._lightbox.open(this._albums);
      }
    }
  }

  // function to get profilePicture details
  onPictureSelect(input: any) {
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.newProfilePicture = e.target['result'];
      }
      reader.readAsDataURL(input.target.files[0]);
      this.profilePictureToUpdate = input.target.files[0];
    }
  }

  // update the profile picture of the user
  updateProfilePicture(): void {
    // @TODO update profile picture

    // this.userService.updateProfile(
    //   {
    //     "profile_pic": this.profilePictureToUpdate
    //   }).subscribe((response: any) => {
    //     this.toastr.success(response.msg)
    //     // this.profilePictureToUpdate = undefined;
    //     // this.profilePicture = response.profile_image;
    //     // this.newProfilePicture = '';
    //     // this.profileService.onProfilePictureChange.next(this.profilePicture);
    //   }, error => {
    //     this.toastr.error(error.msg);
    //   })
  }

}
