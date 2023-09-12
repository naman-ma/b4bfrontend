import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../directives/directives.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ModalsModule } from '../modals/modals.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    NgbDropdownModule,
    LightboxModule,
    ModalsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent
  ]
})
export class ComponentsModule { }
