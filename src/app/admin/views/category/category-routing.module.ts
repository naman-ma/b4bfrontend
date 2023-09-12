import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';


const routes: Routes = [
  {
    path: 'list',
    component: CategoryListingComponent
  },
  {
    path: ':id',
    component: CategoryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
