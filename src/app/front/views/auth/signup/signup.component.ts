import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public selectedRole: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        // Defaults to manufacturer if no query param provided.
        this.selectedRole = params['role'] || 'manufacturer';
        if (!this.selectedRole) {
          return this.toastr.info('Please select any one role to proceed ahead!');
        }
      });
  }

}
