import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/front/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/front/interfaces/response';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPassword: FormGroup;

  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.forgotPassword = this.builder.group({
      // email: ['', Validators.compose([Validators.required,
      // Validators.pattern(/^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])]
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPassword.valid) {
      this.authService.forgotPassword({
        "email": this.forgotPassword.value.email,
      }).subscribe((response: Response) => {
        if (response.success) {
          this.router.navigate(['/auth/login']);
          this.toastr.success(response['message']);
        } else {
          this.toastr.success(response['message']);
        }
      }, (error: any) => {
        console.log('--error--', error);
      })
    }
  }

}
