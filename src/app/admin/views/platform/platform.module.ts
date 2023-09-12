import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform.component';
import { PlatformListComponent } from './platform-list/platform-list.component';


@NgModule({
  declarations: [PlatformComponent, PlatformListComponent],
  imports: [
    CommonModule,
    PlatformRoutingModule
  ]
})
export class PlatformModule { }
