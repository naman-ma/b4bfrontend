import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';


@NgModule({
  declarations: [CategoryListingComponent, CategoryDetailsComponent, CategoryAddEditComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    NgbTabsetModule,
  ]
})
export class CategoryModule { }
