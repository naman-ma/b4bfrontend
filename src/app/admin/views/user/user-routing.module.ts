import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: 'my-profile',
    component: UserProfileComponent
  },
  {
    path: 'list',
    component: UsersListingComponent
  },
  {
    path: ':id',
    component: UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
