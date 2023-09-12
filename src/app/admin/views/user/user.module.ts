import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersListingComponent } from './users-listing/users-listing.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserDetailsComponent,
    UsersListingComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    NgbTabsetModule,
    LightboxModule
  ]
})
export class UserModule { }
