import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Response } from '../../../interfaces/response';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private service: AuthService,
    private builder: FormBuilder, 
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.spinner.show();
    return this.service.login({
      ...this.loginForm.value,
      isAdmin: true
    }).subscribe((response: Response) => {
      console.log('response: ', response);
      this.spinner.hide();
        this.router.navigate(['/admin/dashboard']);
        if (response.success) {
          this.toastr.success(response.message);
          localStorage.setItem('admin_access_token', response.payload['access_token']);
          console.log(response.payload['mkc'])
        }
      });
  }

}
