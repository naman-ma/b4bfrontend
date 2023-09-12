import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhoAreYouComponent } from './who-are-you/who-are-you.component';


@NgModule({
  declarations: [
    WhoAreYouComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WhoAreYouComponent
  ]
})
export class ModalsModule { }
