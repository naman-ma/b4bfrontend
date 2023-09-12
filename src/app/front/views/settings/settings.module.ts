import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    SettingsComponent,
    LeftSidebarComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ComponentsModule
  ]
})
export class SettingsModule { }
