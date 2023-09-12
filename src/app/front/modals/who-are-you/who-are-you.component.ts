import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-who-are-you',
  templateUrl: './who-are-you.component.html',
  styleUrls: ['./who-are-you.component.scss']
})

export class WhoAreYouComponent implements OnInit {

  @ViewChild("OpenWhoAreYouModal", { static: false }) OpenWhoAreYouModal: any;
  public modalRef;
  public selectedRole;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  openModal() {
    return this.modalRef = this.modalService.open(this.OpenWhoAreYouModal, {
      centered: true,
      size: "xl"
      // windowClass: "myCustomModalClass"
    });
  }

  close() {
    this.modalRef.close();
  }

  onSelectionChange(event) {
    this.selectedRole = event.target.value;
  }


  goToSignupPage() {
    if (!this.selectedRole) {
      return this.toastr.info('Please select any one among the following to proceed ahead!');
    }
    this.close();
    this.router.navigate(['/auth/register'], { queryParams: { role: this.selectedRole } });
  }

}
