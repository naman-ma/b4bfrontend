import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupManufacturerComponent } from './signup/signup-manufacturer/signup-manufacturer.component';
import { SignupDistributorComponent } from './signup/signup-distributor/signup-distributor.component';
import { SignupSpecialistComponent } from './signup/signup-specialist/signup-specialist.component';
import { ModalsModule } from '../../modals/modals.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    LogoutComponent,
    SignupManufacturerComponent,
    SignupDistributorComponent,
    SignupSpecialistComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    ModalsModule
  ],
  exports: [
    LogoutComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule { }
