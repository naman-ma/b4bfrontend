import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Response } from '../../../interfaces/response';
import { environment } from '../../../../../environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Lightbox } from 'ngx-lightbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/admin/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public modalRef;
  public backendUrl = environment.backendUrl + 'uploads';
  public oldPassword: any;
  public newPassword: any;
  public confirmPassword: any;

  public updateProfileForm: FormGroup;
  public isLoggedIn: boolean;
  public isValidUpdateProfileSubmitted: boolean = false;
  public profilePicture: File;
  public selectedPicture: any;
  public _albums: any = [];
  public loggedInUserDetails;
  public userDetails;

  constructor(
    public router: Router,
    private userService: UserService,
    private toastrService: ToastrService,
    private builder: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private _lightbox: Lightbox,
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getUserDetails();
    this.updateProfileForm = this.builder.group({
      first_name: [''],
      last_name: [''],
      mobile: [''],
      profile_pic: ['']
    });
  }


  changePassword(oldPassword, newPassword, confirmPassword) {
    if (!newPassword || !confirmPassword) {
      this.toastrService.info('Please fill the form fields to change your account password..!!');
    } else if (newPassword.length < 6 || confirmPassword.length < 6) {
      this.toastrService.info('Password should be atleast 6 characters long..!!');
    } else {
      if (newPassword == confirmPassword) {
        const formData = new FormData();
        formData.append('old_password', oldPassword);
        formData.append('new_password', newPassword);
        this.modalRef.close();
        this.oldPassword = null;
        this.newPassword = null;
        this.confirmPassword = null;
        this.updateUserDetail(formData);
      } else {
        this.toastrService.error('New password and Confirm password doesn\'t match !!');
      }
    }
  }

  updateUserDetail(formData) {
    this.userService.updateUser(formData).subscribe((response: Response) => {
      if (response['success']) {
        this.toastrService.success(response.message);
        this.getUserDetails();
      }
    });
  }

  viewModal(content) {
    this.getUserDetails();
    this.selectedPicture = null;
    this.profilePicture = null;
    this.modalRef = this.modalService.open(content);
  }

  close() {
    this.selectedPicture = null;
    this.profilePicture = null;
    this.modalRef.close();
    this.updateProfileForm.reset();
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
          this.updateProfileForm.patchValue({
            first_name: this.userDetails.first_name,
            last_name: this.userDetails.last_name,
            // address: this.meta.address,
            mobile: this.userDetails.mobile != "null" ? this.userDetails.mobile : '',
            uid: this.userDetails.uid
          });
        }
      });
    }
  }

  /**
   * callled on edit/update profile submit
   */
  updateProfile() {
    const formData = new FormData();
    this.isValidUpdateProfileSubmitted = true;
    formData.append('first_name', this.updateProfileForm.value['first_name']);
    formData.append('last_name', this.updateProfileForm.value['last_name']);
    // formData.append('address', this.updateProfileForm.value['address'].trim());
    if (this.updateProfileForm.value['mobile'] && this.updateProfileForm.value['mobile'].toString().length < 12) {
      return;
    } else {
      formData.append('mobile', this.updateProfileForm.value['mobile']);
    }
    if (this.profilePicture) {
      formData.append('profile_pic', this.profilePicture, this.profilePicture.name);
    }
    this.userService.updateUser(formData).subscribe((response: Response) => {
      if (response['success']) {
        this.toastrService.success(response['message']);
        this.updateProfileForm.reset();
        this.close();
        this.getUserDetails();
      }
    });
  }

  onFileUpload(event) {
    this.profilePicture = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.profilePicture);
    reader.onload = (_event) => {
      this.selectedPicture = reader.result;
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

}
