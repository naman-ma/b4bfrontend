import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatformComponent } from './platform.component';
import { PlatformListComponent } from './platform-list/platform-list.component';


const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    data: {
      title: 'Platform'
    }
  },
  {
    path: 'list',
    component: PlatformListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
