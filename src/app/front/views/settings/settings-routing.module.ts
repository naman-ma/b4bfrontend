import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';


const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      },
      {
        path: 'manufacturer',
        loadChildren: () => import('./manufacturer/manufacturer.module').then(m => m.ManufacturerModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
