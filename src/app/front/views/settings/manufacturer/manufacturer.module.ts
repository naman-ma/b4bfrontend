import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { MyProductsComponent } from './my-products/my-products.component';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  declarations: [MyProductsComponent, AddProductComponent],
  imports: [
    CommonModule,
    ManufacturerRoutingModule
  ]
})
export class ManufacturerModule { }
