import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProductsComponent } from './my-products/my-products.component';
import { AddProductComponent } from './add-product/add-product.component';


const routes: Routes = [
  {
    path: "add-product",
    component: AddProductComponent
  },
  {
    path: "my-products",
    component: MyProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturerRoutingModule { }
