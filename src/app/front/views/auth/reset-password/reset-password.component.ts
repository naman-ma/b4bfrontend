import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/front/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {

  public resetPassword: FormGroup;
  public token: string;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.token = params.token;
      });

    this.resetPassword = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      repeat_password: ['', Validators.required]
    });

  }

  onResetPassword(): void {
    if (this.resetPassword.valid) {
      this.authService.resetPassword({
        "token": this.token,
        "password": this.resetPassword.value.password,
      }).subscribe(
        (response: Response) => {
          if (response.status) {
            this.toastr.success(response['message']);
          } else {
            this.toastr.success(response['message']);
          }
          this.router.navigate(['/auth/login']);
        }, (error: any) => {
          console.log('--error--onResetPassword', error);
        })
    }
  }

}
