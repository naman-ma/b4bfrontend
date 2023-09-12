import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';
import Constants from '../../../CONSTANT';
import { UserService } from '../../../services/user.service';
import { environment } from 'src/environments/environment';
import { Lightbox } from 'ngx-lightbox';
import { Response } from 'src/app/admin/interfaces/response';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public backendUrl = environment.backendUrl + 'uploads';
  public userId;
  public userDetails;
  public modalRef;
  public constants = Constants;
  public selectedRoles = new Set();
  public _albums: any = [];
  public warningEmailContent;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toaster: ToastrService,
    private modalService: NgbModal,
    private _lightbox: Lightbox,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.userId = params.id;
        this.getUserDetails(params.id);
      })
  }

  /**
   * 
   * @param userId : string
   */
  getUserDetails(userId: string) {
    this.userService.getUserDetails(userId).subscribe((response: Response) => {
      console.log('response: getUserDetails()', response);
      if (response['success'] && response['payload']) {
        this.userDetails = response['payload'];
        // this.userDetails.roles.map(role => {
        //   this.selectedRoles.add(role);
        // });
      }
    },
      (error: any) => {
        console.log('error: ', error);
      });
  }

  /**
   * 
   * Send warning email to user
   */
  sendUserWarningEmail() {
    this.spinner.show();

    this.userService.sendWarningEmail({
      "email": this.userDetails.email,
      "mailContent": this.warningEmailContent
    }).subscribe((response: Response) => {
      this.spinner.hide();

      console.log('response: sendUserWarningEmail()', response);
      if (response['success']) {
        this.toaster.success(response['message']);
        this.close();
        this.warningEmailContent = '';
      }
    },
      (error: any) => {
        console.log('error: ', error);
      });
  }

  /**
   * 
   * @param accountStatus : string
   */
  updateAccountStatus(accountStatus: string) {
    // this.userService.updateAccountStatus({
    //   "id": this.userDetails.id,
    //   "account_status": accountStatus
    // }).subscribe(
    //   (response: any) => {
    //     // console.log('response: updateAccountStatus()', response);
    //     if (response['status']) {
    //       this.toaster.success(response['message']);
    //       this.userDetails.account_status = accountStatus;
    //     }
    //   },
    //   (error: any) => {
    //     console.log('error: ', error);
    //   });

  }

  viewModal(content) {
    this.modalRef = this.modalService.open(content);
  }

  close() {
    this.modalRef.close();
  }

  updateRoleAcess({ target: { checked } }, role: String, user): void {
    role = role.toLowerCase();
    if (checked) {
      this.selectedRoles.add(role);
    } else {
      this.selectedRoles.delete(role);
    }
  }

  /**
   * 
   * @param user :user Details { object }
   */
  update(user: any) {
    console.log('user: ', user);
    const roles = Array.from(this.selectedRoles);

    if (!roles.length) {
      this.toaster.error('Please select atleast one role!');
      return false;
    }

    // this.userService.updateUserRoles({
    //   id: this.userDetails.id,
    //   roles
    // }).subscribe(
    //   (response: any) => {
    //     if (response['status']) {
    //       this.toaster.success(response['message']);
    //       this.userDetails.roles = response.payload;
    //       this.close();
    //     }
    //   },
    //   (error: any) => {
    //     console.log('error: ', error);
    //   });
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
