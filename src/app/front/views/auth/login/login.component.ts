import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/front/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/front/interfaces/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  @ViewChild("OpenWhoAreYouModal", { static: false }) OpenWhoAreYouModal: any;
  /**
   * login form group instance
   */
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  /**
   * opens who-are-you modal
   */
  openModalPopup() {
    this.OpenWhoAreYouModal.openModal();
  }

  /**
   * called on successful login form submit
   */
  login() {
    this.authService.login(this.loginForm.value).subscribe((response: Response) => {
      if (response.success) {
        console.log('response: ', response);

        this.authService.userSignedIn$.next(true);
        let userData = {};

        localStorage.setItem('access_token', response.payload.access_token);
        const token = localStorage.getItem('access_token') && localStorage.getItem('access_token').split('.');
        if (Array.isArray(token)) {
          localStorage.setItem('user_data', token[1]);
          userData = JSON.parse(atob(token[1]));
          // console.log('userData: ', userData);
        }

        this.router.navigate(['/settings/user/profile']);

        // let urlToRedirect;
        // if (userData && userData['role'].includes('buyer')) {
        //   urlToRedirect = '/settings/user/profile';
        //   this.router.navigate([urlToRedirect]);
        // }
        // if (userData && userData['role'].includes('manufacturer')) {
        //   urlToRedirect = '/settings/manufacturer/dashboard';
        //   this.router.navigate([urlToRedirect]);
        // }

        this.loginForm.reset();
        this.toastr.success(response['message']);

      } else {
        this.authService.userSignedIn$.next(false);
        this.toastr.success(response['message']);
      }

    });
  }

}
