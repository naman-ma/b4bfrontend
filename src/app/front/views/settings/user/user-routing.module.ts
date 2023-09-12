import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProfileComponent } from './view-profile/view-profile.component';


const routes: Routes = [
  {
    path: "profile",
    component: ViewProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
